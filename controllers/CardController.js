var mongoose = require("mongoose");
//const Card = require("../models/Card");
var Card = mongoose.model("Card");
var User = mongoose.model("User");
var cardController = {};

// userController.list = function (req, res) {
//   User.find({}).exec(function (err, users) {
//     if (err) {
//       console.log("Error:", err);
//     } else {
//       res.render("../views/users/index", { users: users });
//     }
//   });
// };
cardController.list = function(req,res) {
    console.log("gggg");
    Card.find({}).exec(function (err, cards) {
        if(err) {
            console.log("Error: ", err);
        } else {
            res.render("../views/cards/index", {cards: cards});
        }
    })
}

// userController.show = function (req, res) {
//   User.findOne({ _id: req.params.id }).exec(function (err, user) {
//     if (err) {
//       console.log("Error:", err);
//     } else {
//       res.render("../views/users/show", { user: user });
//     }
//   });
// };
// cardController.show = function (req, res) {
//     Card.findOne({_id})
// }
// userController.create = function (req, res) {
//   res.render("../views/users/create");
// };

// userController.save = function (req, res) {
//   var user = new User(req.body);
//   user.save(function (err) {
//     if (err) {
//       console.log(err);
//       res.render("../views/users/create");
//     } else {
//       console.log("Successfully created an user.");
//       res.redirect("/users/show/" + user._id);
//     }
//   });
// };
cardController.remove = function (req, res) {
    Card.remove({ _id: req.params.id }, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Card deleted!");
          res.redirect("/cards");
        }
    });
};
cardController.save = function (req, res) {
    console.log("hey as cia ");
    
    
    var card = new Card(req.body);
    card.save(function (err) {
        if(err) {
            console.log(err);
            res.render("../views/cards/create");
        } else {
            console.log("Successfully created a card.");
          res.redirect("/cards/");
        }
    });
}
cardController.create = function (req, res) {
    console.log("sasasasa");
    res.render("../views/cards/create");
  };
cardController.edit = function (req, res) {
    console.log("mes edite");
  Card.findOne({_id: req.params.id}).exec(function (err, card) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/cards/edit", { card: card });
    }
  });
};

cardController.update = function (req, res) {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        number: req.body.number
        
      },
    },
    { new: true },
    function (err, user) {
      if (err) {
        console.log(err);
        res.render("../views/cards/create", { card: req.body });
      }
      else {
          console.log("Korta redaguota sėkmingai")
        res.redirect("/cards/");
      }
      
    }
  );
};

// userController.delete = function (req, res) {
//   User.remove({ _id: req.params.id }, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("User deleted!");
//       res.redirect("/users");
//     }
//   });
// };
module.exports = cardController;
// module.exports = userController;
