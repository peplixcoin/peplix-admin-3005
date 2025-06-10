require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const packageRoutes = require('./routes/packageRoutes');
const userRoutes = require('./routes/userRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');
const welcomeRoutes = require('./routes/welcomeRoutes');
const usdRateRoutes = require('./routes/usdRateRoutes');
const termsRoutes = require('./routes/termsRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS to allow requests from the frontend
app.use(cors({
  origin: [
    'https://peplix-admin-3005ccd654.onrender.com/',
    'https://peplix-admin-3005ccd654.onrender.com/api',
    'http://localhost:5001', // Allow requests from the frontend served on the same port
  ],
  credentials: true, // If your app uses cookies or authentication headers
}));

// Serve static files from the React frontend build folder
app.use(express.static(path.join(__dirname, 'build','index.html')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/withdrawals', withdrawRoutes);
app.use('/api', welcomeRoutes);
app.use('/api', usdRateRoutes);
app.use('/api', termsRoutes);
app.use('/api/image', imageRoutes);

// Handle client-side routing by serving index.html for all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});