const express = require("express");
const path = require("path");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://Botirjon:4pNNd6dLX0qb8JFP@cluster0.a2mle2z.mongodb.net/node-blog"
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", `${__dirname}/views`);

app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post });
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});
app.post("/posts/create", (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, "public/posts", image.name), (err) => {
    if (err) throw err;
    Post.create({...req.body, image: `${image.name}`}, (err, post) => {
      res.redirect("/");
    });
  });
});

app.listen(5000, () => {
  console.log("Server has been started on Port 5000...");
});
