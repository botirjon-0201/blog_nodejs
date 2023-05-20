const path = require("path");
const Post = require("../models/post");

const homePage = async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.render("index", { posts });
};

const newPost = (req, res) => {
  res.render("create");
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "username"
  );
  res.render("post", { post });
};

const createPost = (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, "..", "public/posts", image.name), (err) => {
    if (err) console.log(err);
    Post.create(
      { ...req.body, image: `${image.name}`, author: req.session.userId },
      (err, post) => {
        res.redirect("/");
      }
    );
  });
};

module.exports = { homePage, newPost, getPost, createPost };
