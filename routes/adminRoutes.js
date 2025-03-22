const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/authMiddleware');

router.get('/admin/dashboard', ensureAdmin, adminController.getAdminDashboard);
router.post('/admin/movies/add', ensureAdmin, adminController.addMovie);
router.get('/admin/movies/:id/edit', ensureAdmin, adminController.getEditMovie);
router.post('/admin/movies/:id/edit', ensureAdmin, adminController.editMovie);
router.post('/admin/movies/:id/delete', ensureAdmin, adminController.deleteMovie);
router.post('/admin/reviews/:id/delete', ensureAdmin, adminController.deleteReview);
router.post('/admin/users/:id/delete', ensureAdmin, adminController.deleteUser);
router.get('/admin/movies', ensureAdmin, adminController.getMovies);

module.exports = router;