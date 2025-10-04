const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { jwtMiddleware } = require('../middleware/jwt.middleware');

router.get('/me', jwtMiddleware, userController.getMe);

module.exports = router;
