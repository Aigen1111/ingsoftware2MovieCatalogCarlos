const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/authMiddleware');

router.get('/admin/dashboard', ensureAdmin, adminController.getAdminDashboard);
router.get('/admin/movies/add', ensureAdmin, (req, res) => {
    res.render('addMovie', { title: 'Agregar Película' });
});
router.post('/admin/movies/add', ensureAdmin, adminController.addMovie);
router.get('/admin/movies/:id/edit', ensureAdmin, adminController.getEditMovie);
router.post('/admin/movies/:id/edit', ensureAdmin, adminController.editMovie);
router.post('/admin/movies/:id/delete', ensureAdmin, adminController.deleteMovie);
router.post('/admin/reviews/:id/delete', ensureAdmin, adminController.deleteReview);
router.post('/admin/users/:id/delete', ensureAdmin, adminController.deleteUser);
router.get('/admin/movies', ensureAdmin, adminController.getMovies);
router.get('/admin/users', ensureAdmin, adminController.getUsers);
router.get('/admin/users/:id/edit', ensureAdmin, adminController.getEditUser);
router.post('/admin/users/:id/edit', ensureAdmin, adminController.editUser); 
router.get('/admin/reviews', ensureAdmin, adminController.getReviews);
router.get('/admin/ratings', ensureAdmin, adminController.getRatings);

module.exports = router;