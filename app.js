const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const connectFlash = require('connect-flash');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); // Importa las rutas del usuario
const { ensureAuthenticated, ensureAdmin } = require('./middleware/authMiddleware');
const cors = require('cors');
require('dotenv').config();
require('./config/passport')(passport);

const app = express();

// Conectar a la base de datos
connectDB();
// Configura CORS
app.use(cors({
  origin: 'http://localhost:8080', // Permite solicitudes desde el frontend
  credentials: true, // Permite el envío de cookies
}));
// Configuración de EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // Configurar el layout por defecto

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());
app.use(express.static('public'));

// Variables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Rutas
app.use('/', authRoutes);
app.use('/', adminRoutes);
app.use('/', userRoutes); // Usa las rutas del usuario
app.get('/', (req, res) => res.render('index', { title: 'Inicio' }));
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  if (req.user.role === 'admin') {
    // Redirige al dashboard del administrador
    return res.redirect('/admin/dashboard');
  } else if (req.user.role === 'user') {
    // Redirige al frontend en localhost:8080 para usuarios normales
    return res.redirect('http://localhost:8080/dashboard');
  } else {
    // Si el rol no es válido, redirige al login
    return res.redirect('/login');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));