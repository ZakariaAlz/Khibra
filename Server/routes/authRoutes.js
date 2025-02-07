const express = require('express');
const AuthController = require('../controllers/AuthController.js');

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

module.exports = router;
