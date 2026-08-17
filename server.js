require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const setupSwagger = require('./src/config/swagger');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Swagger ──────────────────────────────────────────────────────────────────
setupSwagger(app);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);
const productRoutes = require('./src/routes/productRoutes');
app.use('/products', productRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (request, response) => {
    response.status(200).json({ status: 'ok', message: 'Server is running' });
});

// ─── MongoDB Connection & Server Start ────────────────────────────────────────
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    });

module.exports = app;
