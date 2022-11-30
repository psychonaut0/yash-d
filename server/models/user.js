const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  hash: {type: String, required: true},
  salt: {type: String, required: true}
},
{
  timestamps: true,
})


module.exports = mongoose.model("User", UserSchema)