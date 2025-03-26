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
  console.log('Request body:', req.body); 
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    if (user.favorites.includes(movieId)) {
      user.favorites = user.favorites.filter(fav => fav.toString() !== movieId);
    } else {
      user.favorites.push(movieId);
    }

    await user.save();
    console.log('Updated favorites:', user.favorites); 
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
  console.log('Request body:', req.body); // Verifica el contenido del cuerpo de la solicitud
  const { movieId, comment } = req.body;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const review = new Review({ user: req.user.id, movie: movieId, comment });
    await review.save();

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.reviews.push(review._id); // Añade el ID de la reseña al array del usuario
    await user.save();

    console.log('Updated reviews:', user.reviews); // Verifica el array actualizado
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

exports.removeFavoriteJSON = async (req, res) => {
  console.log('Request body:', req.body);
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }


    user.favorites = user.favorites.filter(fav => fav !== null && fav.toString() !== movieId);

    console.log('Removing favorite:', movieId);
    await user.save();

    console.log('Updated favorites:', user.favorites);
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error in removeFavoriteJSON:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};