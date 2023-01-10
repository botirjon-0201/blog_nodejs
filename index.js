const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");

const homePageController = require("./controllers/homePage");
const getPostsController = require("./controllers/getPosts");
const newPostController = require("./controllers/newPost");
const createPostController = require("./controllers/createPost");
const createUserController = require("./controllers/createUser");
const userStoreController = require("./controllers/userStore");
const loginController = require("./controllers/login");
const loginStoreController = require("./controllers/loginStore");

const app = express();

const storePostMiddleware = require("./middlewares/storePost");

const MongoUrl =
  "mongodb+srv://Botirjon:4pNNd6dLX0qb8JFP@cluster0.a2mle2z.mongodb.net/node-blog";

mongoose.set("strictQuery", false);
mongoose.connect(MongoUrl);

app.use(
  expressSession({
    secret: "sam",
    store: mongoStore.create({ mongoUrl: MongoUrl }),
  })
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
app.get("/reg", createUserController);
app.post("/auth/reg", userStoreController);
app.get("/log", loginController);
app.post("/auth/log", loginStoreController);

app.listen(5000, () => {
  console.log("Server has been started on Port 5000...");
});
