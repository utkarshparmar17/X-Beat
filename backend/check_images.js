
import axios from 'axios';

const checkImages = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/products');
        const products = response.data;
        console.log(`Checking ${products.length} products...`);

        if (products.length > 0) {
            console.log("Sample 1 Hero Image:", products[0].heroImage);
            console.log("Sample 1 Images[0]:", products[0].images[0]);
            console.log("Sample 2 Hero Image:", products[1].heroImage);
        }
    } catch (error) {
        console.error(error.message);
    }
};

checkImages();
