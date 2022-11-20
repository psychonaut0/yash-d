const mongoose = require("mongoose");
const { urlRegex } = require("../utils/regex");

const Schema = mongoose.Schema;


const ImageSchema = new Schema(
  {
    sourceUrl: { type: String, match: urlRegex, required: true },
    relativeUrl: { type: String, required: true },
    filename: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", ImageSchema);