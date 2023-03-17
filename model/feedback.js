const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 5
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
