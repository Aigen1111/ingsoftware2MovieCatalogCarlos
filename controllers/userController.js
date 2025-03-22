const User = require('../models/User');
const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.getProfileJSON = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites').populate('reviews');
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateProfileJSON = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getFavoritesJSON = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.toggleFavoriteJSON = async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.favorites.includes(movieId)) {
      user.favorites = user.favorites.filter(fav => fav.toString() !== movieId);
    } else {
      user.favorites.push(movieId);
    }
    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getReviewsJSON = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id }).populate('movie');
    res.json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.addReviewJSON = async (req, res) => {
  const { movieId, comment } = req.body;
  try {
    const review = new Review({ user: req.user.id, movie: movieId, comment });
    await review.save();
    res.json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.editReviewJSON = async (req, res) => {
  const { reviewId, comment } = req.body;
  try {
    const review = await Review.findByIdAndUpdate(reviewId, { comment }, { new: true });
    res.json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deleteReviewJSON = async (req, res) => {
  const { reviewId } = req.body;
  try {
    await Review.findByIdAndDelete(reviewId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getDashboardJSON = async (req, res) => {
  try {
    const movies = await Movie.find(); // Asegúrate de que esta consulta devuelve datos
    const user = await User.findById(req.user.id).populate('favorites');
    res.json({ user, movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};