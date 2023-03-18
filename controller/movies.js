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
    const { name, feedback } = req.body;
    const movie = await Movie.create({
      name,
      feedback,
    });
    return res.status(201).json({
      message: 'Feedback Added Successfully!',
      movie,
    });
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
