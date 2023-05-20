const router = require("express").Router();

const {
  homePage,
  newPost,
  createPost,
  getPost,
} = require("../controllers/post.controller");
const { authMiddleware } = require("../middlewares/auth");
const { storePostMiddleware } = require("../middlewares/storePost");

router.get("/", homePage);
router.get("/post/:id", getPost);
router.get("/posts/new", authMiddleware, newPost);
router.post("/posts/create", authMiddleware, storePostMiddleware, createPost);

module.exports = router;
