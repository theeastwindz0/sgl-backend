const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    isImage: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
