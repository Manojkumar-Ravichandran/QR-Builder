const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/qrcodes', require('./routes/qrcode.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/billing', require('./routes/billing.routes'));
app.use('/', require('./routes/scan.routes'));

module.exports = app;
