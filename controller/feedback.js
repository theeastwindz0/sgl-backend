const Feedback = require('../model/feedback');

exports.getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find();
    return res.status(200).json({
      message: 'Feedback fetched successfully',
      feedback: feedback,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err,
    });
  }
};

exports.postFeedback = async (req, res, next) => {
  try {
    const { name, feedback ,rating } = req.body;
    if (!name || !feedback) {
      return res.status(400).json({
        message: 'Name and feedback are required',
      });
    }

    const feedBack = await Feedback.create({
      name: name,
      feedback: feedback,
      rating: rating
    });
    return res.status(201).json({
      message: 'Feedback created successfully',
      feedback: feedBack,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err,
    });
  }
};
