const path = require("path");
const Post = require("../models/Post");

module.exports = (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, "..", "public/posts", image.name), (err) => {
    if (err) throw err;
    Post.create({ ...req.body, image: `${image.name}` }, (err, post) => {
      res.redirect("/");
    });
  });
};
