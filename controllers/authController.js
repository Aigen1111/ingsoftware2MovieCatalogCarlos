const User = require('../models/User');
const passport = require('passport');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).render('register', { title: 'Register', error: 'Email already exists' });
    }
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).render('register', { title: 'Register', error: 'Username already exists' });
    }
    user = new User({ username, email, password, role });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).render('register', { title: 'Register', error: 'Server error' });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};

exports.logout = async(req, res) => {
  try {
    await api.get('/logout'); // Llama al endpoint de logout en el backend
    this.$router.push('/login'); // Redirige al login después de cerrar sesión
  } catch (error) {
    console.error('Error logging out:', error);
  }
};