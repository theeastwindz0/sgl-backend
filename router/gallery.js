const GalleryController = require('../controller/gallery');
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { verifyToken } = require('../middlewares/jwt');
cloudinary.config({ 
  cloud_name: 'dagab89wn', 
  api_key: '246182273423647', 
  api_secret: 'J_jaVMePCpQbIT9ptOcFi2XfFyE' 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sgl-miniplex',
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
