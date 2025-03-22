const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Perfil del usuario
router.get('/profile', ensureAuthenticated, userController.getProfileJSON);
router.put('/profile', ensureAuthenticated, userController.updateProfileJSON);

// Favoritos del usuario
router.get('/favorites', ensureAuthenticated, userController.getFavoritesJSON);
router.post('/favorites/toggle', ensureAuthenticated, userController.toggleFavoriteJSON);

// Reseñas del usuario
router.get('/reviews', ensureAuthenticated, userController.getReviewsJSON);
router.post('/reviews/add', ensureAuthenticated, userController.addReviewJSON);
router.put('/reviews/edit', ensureAuthenticated, userController.editReviewJSON);
router.delete('/reviews/delete', ensureAuthenticated, userController.deleteReviewJSON);

// Dashboard del usuario
//router.get('/dashboard', ensureAuthenticated, userController.getDashboardJSON);

// Dashboard del admin
router.get('/api/dashboard', ensureAuthenticated, userController.getDashboardJSON);

module.exports = router;