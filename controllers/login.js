module.exports = (req, res) => {
  res.render("login", {
    errors: req.flash("loginError"),
    data: req.flash("data")[0],
  });
};
