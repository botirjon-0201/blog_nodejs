const express = require("express");
const expressEdge = require("express-edge");
const fileUpload = require("express-fileupload");
const connectFlash = require("connect-flash");

module.exports = (app) => {
  app.use(express.json());
  app.use(require("../models/user"));
  app.use(require("../models/post"));
  app.use(require("../routes/auth"));
  app.use(require("../routes/post"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(expressEdge.engine);
  app.use(fileUpload());
  app.use(connectFlash());
  app.use((req, res) => res.render("not_found"));
  app.use((req, res, next) => {
    app.locals.auth = req.session.userId;
    next();
  });
};
