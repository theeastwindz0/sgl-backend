const StatsController = require('../controller/stats');
const express = require('express');
const router = express.Router();

router.get('/stats/getStats', StatsController.getStats);
router.get('/stats/updateStats', StatsController.updateStats);

module.exports = router;