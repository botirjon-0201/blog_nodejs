const express = require("express");
const session = require("express-session");
const { config } = require("./config/dotenv");

const app = express();
require("./startup/routes")(app);
require("./startup/db")();

app.use(
  session({
    secret: config.server.jwtSecret(),
    resave: true,
    saveUninitialized: true,
  })
);
app.set("views", `${__dirname}/views`);

const PORT = config.server.port() || 5555;
app.listen(PORT, () => {
  console.log(`Server has been started on Port ${PORT}`);
});
