const express = require('express');
const { profileController } = require('../controllers');
const {verifyData} = require('../middleware');
const  profileSchema  = require('../validations/profileValidation');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/',verifyToken,verifyData(profileSchema),profileController.create)
router.get('/',verifyToken,profileController.get)
router.get('/all',verifyTokenAndAdmin,profileController.getAll)

module.exports = router