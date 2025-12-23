const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/billing.controller');

router.post('/subscribe', auth, c.createOrder);
router.post('/verify', auth, c.verify);

module.exports = router;
