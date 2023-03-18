const VoucherControllers = require('../controller/voucher');
const router = require('express').Router();
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

router.post(
  '/voucher/createVoucher',
  verifyToken,
  upload.single('image'),
  VoucherControllers.createVoucher
);
router.get('/voucher/getAll', VoucherControllers.getVouchers);
router.get('/voucher/get/:id', VoucherControllers.getVoucher);
router.delete(
  '/voucher/delete-voucher/:id',
  verifyToken,
  VoucherControllers.deleteVoucher
);
router.delete(
  '/voucher/disable-voucher/:id',
  verifyToken,
  VoucherControllers.disableVoucher
);

module.exports = router;
