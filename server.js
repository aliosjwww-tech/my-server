const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://cee.buzz/'
};

app.get('/', (req, res) => {
    res.json({ status: 'Proxy Server is Live!' });
});

app.get('/api/latest', async (req, res) => {
    try {
        // تجربة الاتصال بالموقع الرئيسي مباشرة
        const response = await axios.get('https://cee.buzz/', { headers: HEADERS });
        res.json({ success: true, message: "Connected to cee.buzz successfully", status: response.status });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to connect', 
            details: error.message,
            code: error.code
        });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
