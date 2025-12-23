const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/me', userController.getMe);
router.patch('/update-me', userController.updateMe);

module.exports = router;
