var mongoose = require("mongoose");
var Card = mongoose.model("Card");
var Comment = mongoose.model("Comment");
var PhysCard = mongoose.model("PhysicalCard");
var cardController = {};

//Lists all cards
cardController.list = function (req, res) {
  Card.find({}).exec(function (err, cards) {
    if (req.user) {
      if (err) {
        console.log("Error: ", err);
      } else {
        res.render("../views/cards/index", {
          cards: cards,
          role: req.user.local.userType,
          private: false,
        });
      }
    } else {
      res.render("../views/cards/index", {
        cards: cards,
        role: "None",
        private: false,
      });
    }
  });
};

cardController.show = function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");
  Card.findOne({ _id: req.params.id }).exec(function (err, card) {
    if (err) console.log("Error:", err);
    Comment.find({ card: req.params.id }).exec(function (err, comments) {
      if (err) console.log("Error: ", err);
      if (!card) {
        res.redirect("/cards");
      } else {
        res.render("../views/cards/show", {
          card: card,
          comments: comments,
        });
      }
    });
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
    function (err, card) {
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

cardController.postComment = function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");
  Card.findOne({ _id: req.params.id }).exec(function (err, card) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/cards/comment.ejs", { card: card });
    }
  });
};

cardController.insertCardComment = function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");
  var comment = new Comment({
    card: req.params.id,
    commenttext: req.body.commenttext,
    created_at: Date.now(),
  });
  comment.save(function (err) {
    if (err) {
      console.log("Error: ", err);
    } else {
      res.redirect("/cards/show/" + req.params.id);
    }
  });
};

cardController.take = function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");
  var physcard = new PhysCard({
    card: req.params.id,
    owner: req.user._id,
  });
  physcard.save(function (err) {
    if (err) {
      console.log("Error: ", err);
    } else {
      res.redirect("/cards");
    }
  });
};

module.exports = cardController;
