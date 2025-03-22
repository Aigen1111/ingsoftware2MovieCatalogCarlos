const Movie = require('../models/Movie');
const User = require('../models/User');
const Review = require('../models/Review');
const Rating = require('../models/Rating'); 

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const topRatedMovies = await Movie.find().sort({ 'ratings.rating': -1 }).limit(5);
    const users = await User.find();
    const reviews = await Review.find().populate('user').populate('movie');

    res.render('dashboardAdmin', {
      title: 'Admin Dashboard',
      totalMovies,
      topRatedMovies,
      users,
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.addMovie = async (req, res) => {
  const { title, director, releaseYear, genre, synopsis, duration, coverImage } = req.body;
  try {
    const movie = new Movie({ title, director, releaseYear, genre, synopsis, duration, coverImage });
    await movie.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getEditMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.render('editMovie', { title: 'Edit Movie', movie });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.editMovie = async (req, res) => {
  const { title, director, releaseYear, genre, synopsis, duration, coverImage } = req.body;
  try {
    await Movie.findByIdAndUpdate(req.params.id, { title, director, releaseYear, genre, synopsis, duration, coverImage });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('ratings').populate('reviews');
    res.render('movies', { title: 'Películas Existentes', movies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};