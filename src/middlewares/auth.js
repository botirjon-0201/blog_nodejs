const User = require("../models/user");

const authMiddleware = (req, res, next) => {
  User.findById(req.session.userId, (err, user) => {
    if (err || !user) {
      return res.redirect("/");
    }
    next();
  });
};

module.exports = { authMiddleware };
