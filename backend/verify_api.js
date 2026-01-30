
import axios from 'axios';

const testAPI = async () => {
    try {
        console.log("Testing API: http://localhost:5000/api/products");
        const response = await axios.get('http://localhost:5000/api/products');

        if (response.status === 200) {
            console.log("✅ Success! Status 200");
            console.log(`📦 Found ${response.data.length} products.`);
            if (response.data.length > 0) {
                console.log("First product:", response.data[0].title);
                console.log("First product image:", response.data[0].heroImage);
            }
        } else {
            console.log("❌ Failed. Status:", response.status);
        }
    } catch (error) {
        console.error("❌ Error connecting to API:", error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log("💡 Hint: Is the backend server running?");
        }
    }
};

testAPI();
