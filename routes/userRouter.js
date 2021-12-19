const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/users', userController.getUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:userID/cart', userController.getCart);
router.patch('/:userID/addcart', userController.addCart);
router.put('/:userID/updatecart', userController.updateCart);

module.exports = router;
