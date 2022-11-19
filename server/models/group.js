const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  tiles: [{ type: Schema.Types.ObjectId, ref: "Tile" }]
})


module.exports = mongoose.model("Group", GroupSchema)