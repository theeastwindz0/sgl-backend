const FeedBackController = require('../controller/feedback');
const express = require('express');
const   router = express.Router();

router.get('/feedback/getFeedbacks', FeedBackController.getFeedback);
router.post('/feedback/createFeedback', FeedBackController.postFeedback);

module.exports = router;