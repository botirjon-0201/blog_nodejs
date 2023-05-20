const router = require("express").Router();
const {
  createUser,
  userStore,
  login,
  loginStore,
  logout,
} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth");
const { redirectIfAuth } = require("../middlewares/redirect");

router.get("/reg", redirectIfAuth, createUser);
router.post("/auth/reg", userStore);
router.get("/login", redirectIfAuth, login);
router.post("/auth/log", loginStore);
router.get("/logout", authMiddleware, logout);

module.exports = router;