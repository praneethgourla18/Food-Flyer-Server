const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Endpoint to fetch restaurants
app.get('/api/restaurants', async (req, res) => {
    const lat = req.query.lat || '17.4875418';
    const lng = req.query.lng || '78.3953462';
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching restaurants:', error.message || error);
        res.status(500).send('Error fetching restaurants');
    }
});

// Endpoint to fetch menu by restaurant ID
app.get('/api/menu', async (req, res) => {
    const { resId } = req.query;
    const lat = req.query.lat || '17.4875418';
    const lng = req.query.lng || '78.3953462';
    
    if (!resId) {
        return res.status(400).send('restaurantId is required');
    }

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching menu:', error.message || error);
        res.status(500).send('Error fetching menu');
    }
});

// Test route to check if server is running
app.get('/', (req, res) => {
    res.send('Food-Flyer Server is running');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
