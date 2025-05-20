const express = require('express');
const { authController } = require('../controllers');
const {verifyData} = require('../middleware');
const {registerSchema} = require('../validations');
const {loginSchema} = require('../validations');
const router = express.Router();

router.post('/register',verifyData(registerSchema),authController.register)
router.post('/login',verifyData(loginSchema),authController.login)
router.post('/admin',verifyData(loginSchema),authController.adminLogin)
module.exports = router