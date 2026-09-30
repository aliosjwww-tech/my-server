const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('.')); // لخدمة ملف index.html

const TARGET_DOMAIN = 'https://cee.buzz';

// جلب أحدث الأفلام
app.get('/api/latest', async (req, res) => {
    try {
        const response = await axios.get(`${TARGET_DOMAIN}/api/v1/movies/latest`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': TARGET_DOMAIN
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch latest movies' });
    }
});

// البحث عن أفلام
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await axios.get(`${TARGET_DOMAIN}/api/v1/movies/search?q=${encodeURIComponent(query)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': TARGET_DOMAIN
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
