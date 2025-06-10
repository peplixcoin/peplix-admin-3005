require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const packageRoutes = require('./routes/packageRoutes');
const userRoutes = require('./routes/userRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');
const welcomeRoutes = require('./routes/welcomeRoutes');
const usdRateRoutes = require('./routes/usdRateRoutes');
const termsRoutes = require('./routes/termsRoutes');
const imageRoutes = require("./routes/imageRoutes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3001/',
        'http://localhost:3001'
    ]
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/withdrawals', withdrawRoutes);
app.use('/api', welcomeRoutes);
app.use('/api', usdRateRoutes);
app.use('/api', termsRoutes);
app.use("/api/image", imageRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
