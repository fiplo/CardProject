var mongoose = require("mongoose");
var User = require("../models/User");

module.exports = function(app, passport) {
    // Main Page
    app.get("/", function(req, res) {
        if (req.user) {
            res.render("index.ejs", { data: req.user.local });
        } else {
            res.render("index.ejs", { data: NaN });
        }
    });

    //Login Screen
    app.get("/login", function(req, res) {
        res.render("login.ejs", { message: req.flash("loginMessage") });
    });

    //Processing login form
    app.post(
        "/login",
        passport.authenticate("local-login", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: True,
        })
    );

    //Signup
    app.get("/signup", function(req, res) {
        res.render("signup.ejs", { message: req.flash("singupMessage") });
    });

    //Process the signup form
    app.post(
        "/signup",
        passport.authenticate("local-signup", {
            successRedirect: "/profile",
            failureRedirect: "/signup",
            failureFlash: true,
        })
    );

    //Profile page
    app.get("/profile", isLoggedIn, function(req, res) {
        res.render("profile.ejs", {
            user: req.user,
        });
    });

    app.get("/cards", isLoggedIn, function(req, res) {});

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();

        res.redirect("/");
    }
};