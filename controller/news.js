const News = require('../model/news');

exports.getNews = async (req, res) => {
  try {
    const news = await News.find();
    return res.status(200).json({ news });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addNews = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const news = new News({
      title,
      url,
      description,
    });
    await news.save();
    return res.status(200).json({ message: 'News added successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
