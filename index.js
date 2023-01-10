const express = require("express");
const path = require("path");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");
const homePageController = require("./controllers/homePage");
const getPostsController = require("./controllers/getPosts");
const newPostController = require("./controllers/newPost");
const createPostController = require("./controllers/createPost");
const storePostMiddleware = require("./middlewares/storePost");

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

app.get("/", homePageController);
app.get("/post/:id", getPostsController);
app.get("/posts/new", newPostController);
app.post("/posts/create", storePostMiddleware, createPostController);

app.listen(5000, () => {
  console.log("Server has been started on Port 5000...");
});
