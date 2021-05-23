var mongoose = require("mongoose");
var Card = mongoose.model("Card");
var cardController = {};

//Lists all cards
cardController.list = function (req, res) {
  Card.find({}).exec(function (err, cards) {
    if (err) {
      console.log("Error: ", err);
    } else {
      res.render("../views/cards/index", { cards: cards });
    }
  });
};
//Removes specified card.
cardController.remove = function (req, res) {
  Card.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cards");
    }
  });
};
//Saves given card
cardController.save = function (req, res) {
  var card = new Card(req.body);
  card.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/cards/create");
    } else {
      console.log("Successfully created a card.");
      res.redirect("/cards/");
    }
  });
};
//Points to card creation page
cardController.create = function (req, res) {
  res.render("../views/cards/create");
};
//Points to given cards edit page
cardController.edit = function (req, res) {
  Card.findOne({ _id: req.params.id }).exec(function (err, card) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/cards/edit", { card: card });
    }
  });
};
//Updates given card
cardController.update = function (req, res) {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        number: req.body.number,
      },
    },
    { new: true },
    function (err, user) {
      if (err) {
        console.log(err);
        res.render("../views/cards/create", { card: req.body });
      } else {
        console.log("Korta redaguota sėkmingai");
        res.redirect("/cards/");
      }
    }
  );
};

module.exports = cardController;
