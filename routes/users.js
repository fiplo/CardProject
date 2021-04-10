var express = require("express");
var router = express.Router();

var user = require("../controllers/UserController.js");

//Gaunami visi vartotojai
router.get("/", user.list);

//Gaunamas vienas vartotojas su id
router.get("/show/:id", user.show);

//Sukuriamas vartotojas
router.get("/create", user.create);

//Issaugojamas vartotojas
router.post("/save", user.save);

//Redaguojamas vartotojas
router.get("/edit/:id", user.edit);

//Atnaujinamas vartotojas
router.post("/update/:id", user.update);

//Naikinamas vartotojas
router.post("/delete/:id", user.delete);

module.exports = router;
