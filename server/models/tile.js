const mongoose = require("mongoose");
const { urlRegex } = require("../utils/regex");

const Schema = mongoose.Schema;

const TileSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  localUrl: { type: String, match: urlRegex },
  remoteUrl: { type: String, match: urlRegex },
  showTile: { type: Boolean, required: true, default: true },
  image: {type: Schema.Types.ObjectId, ref: "Image"}
});

module.exports = mongoose.model("Tile", TileSchema);
