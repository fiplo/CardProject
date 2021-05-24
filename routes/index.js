var mongoose = require("mongoose");
var User = require("../models/User");
var PhysCards = require("../models/PhysicalCard");

module.exports = function (app, passport, multer) {
  app.get("/", function (req, res, next) {
    if (req.user) {
      res.render("index.ejs", { data: req.user.local });
    } else {
      res.render("index.ejs", { data: NaN });
    }
  });

  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  );

  app.get("/profile", isLoggedIn, function (req, res) {
    res.render("profile.ejs", {
      user: req.user,
    });
  });

  app.get("/mycards", isLoggedIn, function (req, res) {
    PhysCards.find({ owner: req.user._id })
      .populate("card")
      .exec(function (err, cards) {
        if (err) {
          console.log("Error: ", err);
        } else {
          console.log(cards);
          res.render("../views/cards/mycards", {
            user: req.user,
            cards: cards,
            private: true,
            role: req.user.local.userType,
          });
        }
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/users", function (req, res) {});

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/");
  }
};
