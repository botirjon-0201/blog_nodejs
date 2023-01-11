const Post = require("../models/Post");

module.exports = async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.render("index", { posts });
};
