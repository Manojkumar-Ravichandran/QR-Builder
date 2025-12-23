const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/qrcode.controller');

router.post('/', auth, c.create);
router.get('/:id', auth, c.getById);
router.get('/', auth, c.getAll);
router.patch('/:id', auth, c.update);
router.delete('/:id', auth, c.remove);

module.exports = router;
