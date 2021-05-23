var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
    fullname: String,

    userType: {
      type: String,
      enum: ["Client", "Administrator"],
      default: "Client",
    },

    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],

    about: {
      profileImage: { filename: String, destination: String },
      text: { type: String, default: "" },
    },
  },
  update_at: { type: Date, default: Date.now },
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);
