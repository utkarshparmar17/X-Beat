import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importData = async () => {
    try {
        // Read the products file from frontend
        // Note: Adjust path if necessary. currently seeder.js is in backend/ and file is in frontend/
        const jsonPath = path.join(__dirname, '../frontend/products-json.txt');
        const data = fs.readFileSync(jsonPath, 'utf-8');

        // The file content in previous turns showed it is a JS array literal or JSON-like.
        // However the filename is .txt. The content displayed was valid JSON array `[...]`.
        const products = JSON.parse(data);

        // Optional: Fix paths if needed. 
        // If paths are like "/public/products/...", and we serve from frontend public folder, 
        // we might want to strip "/public" to make them "/products/..."
        const fixedProducts = products.map(p => {
            const fixPath = (url) => url ? url.replace('/public/', '/') : url;
            return {
                ...p,
                heroImage: fixPath(p.heroImage),
                images: p.images.map(fixPath)
            };
        });

        await Product.deleteMany(); // Clear existing data
        await Product.insertMany(fixedProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
