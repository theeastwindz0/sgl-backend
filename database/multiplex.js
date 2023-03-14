const mongoose = require('mongoose');

const MultiplexSchema = new mongoose.Schema({
  Username: { type: String },
  Password: { type: String },
  Bigposter: [
    {
      MovieName: { type: String },
      Image: { type: String },
      Description: { type: String },
      Minticket: { type: Number },
      ReleaseDate: { type: String },
      Link: { type: String },
      Trailer: { type: String },
    },
  ],
  NowPlaying: [
    {
      MovieName: { type: String },
      Image: { type: String },
      Description: { type: String },
      Minticket: { type: Number },
      ReleaseDate: { type: String },
      Link: { type: String },
      Trailer: { type: String },
    },
  ],
  SmallMovie: [
    {
      MovieName: { type: String },
      Image: { type: String },
      Description: { type: String },
      Minticket: { type: Number },
      ReleaseDate: { type: String },
      Link: { type: String },
      Trailer: { type: String },
    },
  ],
  ComingSoon: [
    {
      MovieName: { type: String },
      Image: { type: String },
      Description: { type: String },
      Minticket: { type: Number },
      ReleaseDate: { type: String },
      Link: { type: String },
      Trailer: { type: String },
    },
  ],
  Token: { type: String },
  Feedback: [
    {
      Name: { type: String },
      Feedback: { type: String },
    },
  ],
});

const Multiplex = mongoose.model('Multiplex', MultiplexSchema);
module.exports = Multiplex;
