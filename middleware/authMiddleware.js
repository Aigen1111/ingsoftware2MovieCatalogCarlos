module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log('Authenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized' }); 
  },
  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }
    res.status(403).json({ error: 'Forbidden' });
  },
};