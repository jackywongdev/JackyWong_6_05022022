const express = require('express');
const router = express.Router();
const verifyEmail = require('../middleware/verify-email')
const verifyPassword = require('../middleware/verify-password')
const rateLimit = require("../middleware/express-rate-limit")

const userCtrl = require('../controllers/user');

router.post('/signup', verifyEmail, verifyPassword, userCtrl.signup);
router.post('/login', rateLimit.limiter, userCtrl.login);

module.exports = router;