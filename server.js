const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل CORS لجميع المصادر للسماح للواجهة بالاتصال بالسيرفر
app.use(cors());

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://cee.buzz/'
};

// مسار تجريبي للتأكد من أن السيرفر يعمل
app.get('/', (req, res) => {
    res.json({ status: 'Server is running successfully!' });
});

// مسار جلب أحدث الأفلام والمسلسلات
app.get('/api/latest', async (req, res) => {
    try {
        const response = await axios.get('https://cee.buzz/api/v1/latest', { headers: HEADERS });
        res.json(response.data);
    } catch (error) {
        // في حال فشل المصدر الرئيسي، نرجع استجابة مرنة
        res.status(500).json({ error: 'Failed to fetch latest content from source' });
    }
});

// مسار البحث
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const response = await axios.get(`https://cee.buzz/api/v1/search?q=${encodeURIComponent(query)}`, { headers: HEADERS });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search content' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
