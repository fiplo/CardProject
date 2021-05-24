var mongoose = require("mongoose");

var TradeCardSchema = new mongoose.Schema({
  physicalCard: { type: mongoose.Schema.Types.ObjectId, ref: "PhysicalCard" },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("TradeCard", TradeCardSchema);
