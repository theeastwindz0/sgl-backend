const mongoose = require('mongoose');

const multiplexSchema = new mongoose.Schema(
  {
    movieName: { type: String },
    image: { type: String },
    description: { type: String },
    minTicket: { type: Number },
    releaseDate: { type: Date },
    link: { type: String },
    trailer: { type: String },
    tag: { type: String, required: true },
    isDisabled  : { type: Boolean, default: false },
    feedback: [
      {
        name: { type: String },
        feedback: { type: String },
        rating: { type: Number },
        isDisabled  : { type: Boolean, default: true },
      },
    ],
    default: [],
  },
  {
    timestamps: true,
  }
);

const Multiplex = mongoose.model('multiplex', multiplexSchema);
module.exports = Multiplex;
