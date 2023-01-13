const User = require("../models/User");
const bcrypt = require("bcrypt");
// Ko'rish kerak
module.exports = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      const loginError = Object.keys(err.errors)
        .filter((key) => key !== "username")
        .map((key) => err.errors[key].message);
      if (loginError.length === 0) {
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
            res.redirect("/login");
          }
        });
      } else {
        req.flash("data", req.body);
        req.flash("loginError", loginError);
        res.redirect("/login");
      }
    }
  });
};
