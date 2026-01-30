import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: '*', // Allow all origins for debugging
    credentials: true
}));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
