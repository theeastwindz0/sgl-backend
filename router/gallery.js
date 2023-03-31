const GalleryController = require('../controller/gallery');
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { verifyToken } = require('../middlewares/jwt');
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
router.get('/gallery/getAll', GalleryController.getGallery);
router.post(
  '/gallery/add',
  verifyToken,
  upload.single('url'),
  GalleryController.postGallery
);
router.delete(
  '/gallery/delete/:id',
  verifyToken,
  GalleryController.deleteGallery
);

module.exports = router;