const Voucher = require('../model/voucher');
const cloudinary = require('cloudinary').v2;
exports.createVoucher = async (req, res) => {
  try {
    const { title, description, price, from, to } = req.body;
    if (!title || !description || !price || !from || !to) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    const image = req?.file?.path;
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }
    let imageLink = '';
    await cloudinary.uploader.upload(image, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      imageLink = result.secure_url;
    });
    const voucher = await Voucher.create({
      title,
      description,
      price,
      from,
      to,
      image: imageLink,
    });
    return res
      .status(201)
      .json({ voucher, message: 'Voucher created successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    return res.status(200).json({ vouchers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    return res.status(200).json({ voucher });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'Voucher deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.disableVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (voucher.isDisabled === true) {
      voucher.isDisabled = false;
      await voucher.save();
      return res.status(200).json({ message: 'Voucher disabled successfully' });
    }
    voucher.isDisabled = true;
    await voucher.save();
    return res.status(200).json({ message: 'Voucher enabled successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
