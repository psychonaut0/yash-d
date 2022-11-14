const mongoose = require("mongoose");
const { urlRegex } = require("../utils/regex");

const Schema = mongoose.Schema;

const TileSchema = new Schema({
  title: { type: String, required: true},
  description: { type: String},
  localUrl: {type: String, match: urlRegex},
  remoteUrl: {type: String, match: urlRegex},
  showTile: {type: Boolean, required: true, default: true}
});



module.exports = mongoose.model("TileModel", TileSchema)