const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', (req, res) => res.render('register', { title: 'Register' }));
router.post('/register', authController.register);
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));
router.post('/login', authController.login);
router.post('/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/login');
    });
  });

module.exports = router;