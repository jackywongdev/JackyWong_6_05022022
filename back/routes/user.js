const express = require('express');
const router = express.Router();
const verifyEmail = require('../middleware/verify-email')
const verifyPassword = require('../middleware/verify-password')

const userCtrl = require('../controllers/user');

router.post('/signup', verifyEmail, verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;