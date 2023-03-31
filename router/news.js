const newsController = require('../controller/news');


const router = require('express').Router();

router.get('/news/getNews', newsController.getNews);
router.post('/news/addNews', newsController.addNews);

module.exports = router;