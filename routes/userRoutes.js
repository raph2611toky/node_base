const express = require('express');
const { register, login } = require('../controllers/userController');
const validateUser = require('../validators/userValidator');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', login);

module.exports = router;
