const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    isImage: { type: Boolean, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('gallery', gallerySchema);
module.exports = Gallery;
