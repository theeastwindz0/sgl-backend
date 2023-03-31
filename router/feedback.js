const FeedBackController = require('../controller/feedback');
const express = require('express');
const   router = express.Router();

router.get('/feedback/getFeedbacks', FeedBackController.getFeedback);
router.post('/feedback/createFeedback', FeedBackController.postFeedback);
router.get('/feedback/enableOrDisableFeedback/:id', FeedBackController.enableOrDisableFeedback);
module.exports = router;