const mongoose = require("mongoose");
const url = mongoose.Schema({
  longUrl: { type: String },
  shortUrl: { type: String },
  count: { type: Number },
  urlId: { type: String },
});

module.exports = mongoose.model("url", url);
