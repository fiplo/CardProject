var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: String,
  description: String,
  avatar: String,
  email: String,
  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
