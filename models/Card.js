var mongoose = require("mongoose");

var CardSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  author: String,
  number: String,
  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Card", CardSchema);
