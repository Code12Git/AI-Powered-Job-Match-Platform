const express = require('express');
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const jobRoutes = require('./jobRoutes')
const router = express.Router();

router.use('/auth',authRoutes)
router.use('/profile',profileRoutes)
router.use('/job',jobRoutes)
module.exports = router;