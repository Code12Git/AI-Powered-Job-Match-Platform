const express = require('express');
const {jobController } = require('../controllers');
const {verifyData} = require('../middleware');
const { jobSchema } = require('../validations');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/',verifyTokenAndAdmin,verifyData(jobSchema),jobController.create)
router.post('/recommendation', verifyToken, jobController.getRecommendation);
// router.get('/:id',verifyToken,jobController.get)
router.put('/:id',verifyTokenAndAdmin,verifyData(jobSchema),jobController.update)
router.delete('/:id',verifyTokenAndAdmin,jobController.deleteOne)
router.get('/alljobs', verifyToken, jobController.getAll);

module.exports = router