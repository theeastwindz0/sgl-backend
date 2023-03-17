const movieController = require('../controller/movies');
const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
  cloud_name: 'deepank123',
  api_key: '776897673883258',
  api_secret: 'eHV3hRY3GSXmcHgoAoxj2SC00E0',
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Zerox',
  },
});
const upload = multer({ storage: storage });
router.post(
  '/movie/addBigPosterMovie',
  upload.single('image'),
  movieController.addBigPosterMovie
);
router.post(
  '/movie/addSmallPosterMovie',
  upload.single('image'),
  movieController.addSmallPosterMovie
);
router.post(
  '/movie/addNowPlayingMovie',
  upload.single('image'),
  movieController.addNowPlayingMovie
);
router.post(
  '/movie/addComingSoonMovie',
  upload.single('image'),
  movieController.addComingSoonMovie
);
router.post('/movie/addFeedback', movieController.addFeedback);
router.get('/movie/getMovies', movieController.getAllMovies);
router.delete('/movie/deleteMovie/:id', movieController.deleteMovie);
router.delete('/movie/hardDeleteMovie/:id', movieController.hardDeleteMovie);
module.exports = router;
