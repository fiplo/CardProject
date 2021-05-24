var mongoose = require("mongoose");

var TradeSchema = new mongoose.Schema({
  TradeCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "TradeCard" }],
  created_at: Date,
  transfered_at: Date,
});

module.exports = mongoose.model("Trade", TradeSchema);
