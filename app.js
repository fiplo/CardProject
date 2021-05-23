var port = process.env.PORT || 8080;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var session = require("express-session");

mongoose.Promise = global.Promise;
var User = require("./models/User");
var Card = require("./models/Card");
var usersRouter = require("./routes/users");
var cardsRouter = require("./routes/cards");

var configDB = require("./config/database.js");
/*
import { getMtgJson } from "mtg-json";
const mtgjson = await getMtgJson({ type: "AllPrintings", dir: __dirname });
*/
var app = express();

mongoose
  .connect(configDB.url)
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

require("./config/passport")(passport);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "probablyshouldchangethis",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
require("./routes/index")(app, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

app.listen(port);
