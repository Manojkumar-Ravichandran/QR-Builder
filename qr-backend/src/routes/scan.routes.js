const router = require('express').Router();
const c = require('../controllers/scan.controller');

router.get('/r/:code', c.redirect);

module.exports = router;
