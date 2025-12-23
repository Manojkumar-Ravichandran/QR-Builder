const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./middlewares/error.middleware');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/qrcodes', require('./routes/qrcode.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/billing', require('./routes/billing.routes'));
app.use('/health', require('./routes/health.routes'));
app.use('/', require('./routes/scan.routes'));

// 404 Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
