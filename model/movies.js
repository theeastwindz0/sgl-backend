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
    feedback: [
      {
        name: { type: String },
        feedback: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Multiplex = mongoose.model('multiplex', multiplexSchema);
module.exports = Multiplex;
