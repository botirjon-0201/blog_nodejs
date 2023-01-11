const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      const loginError = Object.keys(err.errors)
        .filter((key) => key !== "username")
        .map((key) => err.errors[key].message);
      req.flash("loginError", loginError);
      req.flash("data", req.body);
      return res.redirect("/login");
    } else {
      const { email, password } = req.body;
      User.findOne({ email }, async (err, user) => {
        if (user) {
          const validPassword = await bcrypt.compare(password, user.password);
          if (validPassword) {
            req.session.userId = user._id;
            res.redirect("/");
          } else {
            res.redirect("/login");
          }
        } else {
          return res.redirect("/login");
        }
      });
    }
  });
};
