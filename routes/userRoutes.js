const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Movie = require('../models/Movie'); 

// Perfil del usuario
router.get('/api/profile', ensureAuthenticated, userController.getProfileJSON);
router.put('/api/profile', ensureAuthenticated, userController.updateProfileJSON);
router.get('/api/dashboard', ensureAuthenticated, userController.getDashboardJSON);

// Favoritos del usuario
router.get('/api/favorites', ensureAuthenticated, userController.getFavoritesJSON);
router.post('/api/favorites/toggle', ensureAuthenticated, userController.toggleFavoriteJSON);
router.delete('/api/favorites/remove', ensureAuthenticated, userController.removeFavoriteJSON);

// Reseñas del usuario
router.get('/api/reviews', ensureAuthenticated, userController.getReviewsJSON);
router.post('/api/reviews/add', ensureAuthenticated, userController.addReviewJSON);

router.put('/api/reviews/edit', ensureAuthenticated, userController.editReviewJSON);
router.delete('/api/reviews/delete', ensureAuthenticated, userController.deleteReviewJSON);

// Detalles de la película
router.get('/api/movies/:id', ensureAuthenticated, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;