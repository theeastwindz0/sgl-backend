const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
  description: { type: String },
});

const News = mongoose.model('news', newsSchema);
module.exports = News;