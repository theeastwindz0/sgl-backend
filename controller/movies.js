const Movie = require('../model/movies');
const cloudinary = require('cloudinary').v2;
exports.addBigPosterMovie = async (req, res) => {
  try {
    const {
      movieName,
      description,
      minTicket,
      releaseDate,
      link,
      trailer,
      tag,
    } = req.body;
    if (
      !movieName ||
      !description ||
      !minTicket ||
      !releaseDate ||
      !link ||
      !trailer ||
      !tag
    ) {
      return res.status(400).json({ message: 'All fields are required' });
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

    const movie = await Movie.create({
      movieName,
      description,
      minTicket,
      releaseDate,
      link,
      tag,
      trailer,
      image: imageLink,
    });

    return res.status(201).json({
      message: 'Movie Added Successfully!',
      movie,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addSmallPosterMovie = async (req, res) => {
  try {
    const {
      movieName,
      description,
      minTicket,
      releaseDate,
      link,
      trailer,
      tag,
    } = req.body;
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
    const movie = await Movie.create({
      movieName,
      description,
      minTicket,
      releaseDate,
      link,
      trailer,
      tag,
      image: imageLink,
    });
    return res.status(201).json({
      message: 'Movie Added Successfully!',
      movie,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addNowPlayingMovie = async (req, res) => {
  try {
    const {
      movieName,
      description,
      minTicket,
      releaseDate,
      link,
      trailer,
      tag,
    } = req.body;
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
    const movie = await Movie.create({
      movieName,
      description,
      minTicket,
      releaseDate,
      tag,
      link,
      trailer,
      image: imageLink,
    });
    return res.status(201).json({
      message: 'Movie Added Successfully!',
      movie,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addComingSoonMovie = async (req, res) => {
  try {
    const {
      movieName,
      description,
      minTicket,
      releaseDate,
      link,
      trailer,
      tag,
    } = req.body;
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
    const movie = await Movie.create({
      movieName,
      description,
      minTicket,
      releaseDate,
      link,
      trailer,
      tag,
      image: imageLink,
    });
    return res.status(201).json({
      message: 'Movie Added Successfully!',
      movie,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, feedback, rating } = req.body;
    if (!name || !feedback || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    if (movie.feedback.length > 0) {
      const feedbackExist = movie.feedback.find((f) => f.name === name);
      if (feedbackExist) {
        return res.status(400).json({ message: 'Feedback already exist' });
      } else {
        const newFeedback = {
          name,
          feedback,
          rating,
        };
        movie.feedback.push(newFeedback);
        await movie.save();
      }
    } else {
      const newFeedback = {
        name,
        feedback,
        rating,
      };
      movie.feedback.push(newFeedback);
      await movie.save();
    }

    return res.status(201).json({
      message: 'Feedback Added Successfully!',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.enableOrDisableFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Movie.findOne({
      feedback: { $elemMatch: { _id: id } },
    }).select('feedback');
    const feedbacks = feedback.feedback;
    for (let i = 0; i < feedbacks.length; i++) {
      if (feedbacks[i]._id == id) {
        feedbacks[i].isDisabled = !feedbacks[i].isDisabled;
      }
    }
    await feedback.save();
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    return res
      .status(200)
      .json({ message: 'Feedback status changed successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllMovieFeedback = async (req, res) => {
  try {
    const feedbacks = await Movie.find();
    if (!feedbacks) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    return res.status(200).json({ feedbacks });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (movie.isDisabled === false) {
      movie.isDisabled = true;
      await movie.save();
    } else {
      movie.isDisabled = false;
      await movie.save();
    }
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.hardDeleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json({ movies });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.json({
        message: 'Movie Not Found',
      });
    }
    return res.json({
      message: 'Movie Found',
      movie,
    });
  } catch (error) {
    return res.json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      movieName,
      description,
      minTicket,
      releaseDate,
      link,
      trailer,
      tag,
    } = req.body;
    const image = req?.file?.path;
    let imageLink = '';
    if (image) {
      await cloudinary.uploader.upload(image, (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        imageLink = result.secure_url;
      });
    }
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        $set: {
          movieName: movieName || movie.movieName,
          description: description || movie.description,
          minTicket: minTicket || movie.minTicket,
          releaseDate: releaseDate || movie.releaseDate,
          link: link || movie.link,
          trailer: trailer || movie.trailer,
          tag: tag || movie.tag,
          image: imageLink || movie.image,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: 'Movie Updated Successfully!', movie: updatedMovie });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
