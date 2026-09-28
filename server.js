const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
// استخدام البورت المخصص من السيرفر أو البورت 3000 افتراضياً
const PORT = process.env.PORT || 3000;

// تفعيل CORS للسماح لموقعك بطلب البيانات من السيرفر بدون حظر
app.use(cors());

// 1. مسار جلب الأقسام الرئيسية
app.get('/api/categories', async (req, res) => {
    try {
        const response = await axios.get('https://cee.buzz/api/android/subCategories?lang=ar', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://cee.buzz/',
                'Accept': 'application/json, text/plain, */*'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'فشل في جلب الأقسام من السيرفر المصدر' });
    }
});

// 2. مسار جلب محتوى قسم معين بواسطة الـ ID
app.get('/api/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const response = await axios.get(`https://cee.buzz/api/android/subCategories/${categoryId}?lang=ar`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://cee.buzz/',
                'Accept': 'application/json, text/plain, */*'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching category data:', error.message);
        res.status(500).json({ error: 'فشل في جلب بيانات القسم' });
    }
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
