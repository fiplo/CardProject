var mongoose = require("mongoose");

var PhysCardSchema = new mongoose.Schema({
  card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
  condition: {
    type: String,
    enum: ["Nauja", "Puiki", "Gera", "Menka", "Pažeista"],
    default: "Nauja",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  desc: String,
});

module.exports = mongoose.model("PhysicalCard", PhysCardSchema);
