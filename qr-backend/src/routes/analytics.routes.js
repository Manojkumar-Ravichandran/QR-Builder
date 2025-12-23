const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/analytics.controller');

router.get('/dashboard', auth, c.dashboard);

module.exports = router;
