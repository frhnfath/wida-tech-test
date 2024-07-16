const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

loginRoute = router.post('/login', authController.loginUser);

registerRoute = router.post('/register', authController.registerUser);

module.exports = router;