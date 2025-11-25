const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const productsFile = path.join(__dirname, 'products.json');

// Helper function to read products
const readProducts = () => {
    try {
        const data = fs.readFileSync(productsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { products: [] };
    }
};

// Helper function to write products
const writeProducts = (products) => {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
};

// Initialize sample data if file doesn't exist
if (!fs.existsSync(productsFile)) {
    const initialProducts = {
        products: [
            {
                id: 1,
                name: "Laptop",
                price: 999.99,
                category: "Electronics",
                description: "High-performance laptop"
            },
            {
                id: 2,
                name: "Smartphone",
                price: 699.99,
                category: "Electronics",
                description: "Latest smartphone model"
            },
            {
                id: 3,
                name: "Coffee Maker",
                price: 89.99,
                category: "Home Appliances",
                description: "Automatic coffee maker"
            }
        ]
    };
    writeProducts(initialProducts);
}

// GET /products - Get all products
app.get('/products', (req, res) => {
    try {
        const data = readProducts();
        res.json(data.products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /products/:id - Get single product
app.get('/products/:id', (req, res) => {
    try {
        const data = readProducts();
        const product = data.products.find(p => p.id === parseInt(req.params.id));

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST /products - Add new product
app.post('/products', (req, res) => {
    try {
        const data = readProducts();
        const newProduct = {
            id: Date.now(), // Simple ID generation
            ...req.body
        };

        data.products.push(newProduct);
        writeProducts(data);

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});