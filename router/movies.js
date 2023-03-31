const movieController = require('../controller/movies');
const router = require('express').Router();
const { verifyToken } = require('../middlewares/jwt');
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
  verifyToken,
  upload.single('image'),
  movieController.addBigPosterMovie
);
router.post(
  '/movie/addSmallPosterMovie',
  verifyToken,
  upload.single('image'),
  movieController.addSmallPosterMovie
);
router.post(
  '/movie/addNowPlayingMovie',
  verifyToken,
  upload.single('image'),
  movieController.addNowPlayingMovie
);
router.post(
  '/movie/addComingSoonMovie',
  verifyToken,
  upload.single('image'),
  movieController.addComingSoonMovie
);
router.post('/movie/addFeedback/:id', movieController.addFeedback);
router.get('/movie/getMovies', movieController.getAllMovies);
router.get('/movie/getMovieById/:id', movieController.getMovieById);
router.get('/movie/getAllFeedbacks', movieController.getAllMovieFeedback);
router.delete(
  '/movie/deleteMovie/:id',
  verifyToken,
  movieController.deleteMovie
);
router.delete(
  '/movie/hardDeleteMovie/:id',
  verifyToken,
  movieController.hardDeleteMovie
);
module.exports = router;
