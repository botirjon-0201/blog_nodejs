const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  res.render("register", {
    errors: req.flash("registrationError"),
    data: req.flash("data")[0],
  });
};

const userStore = (req, res) => {
  User.create(req.body, async (err, user) => {
    if (err) {
      const registrationError = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      req.flash("registrationError", registrationError);
      req.flash("data", req.body);
      return res.redirect("/reg");
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user.save();
      res.redirect("/login");
    }
  });
};

// Loginni ko'rish kerak
const login = (req, res) => {
  res.render("login", {
    errors: req.flash("loginError"),
    data: req.flash("data")[0],
  });
};

const loginStore = (req, res) => {
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

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = { createUser, userStore, login, loginStore, logout };
