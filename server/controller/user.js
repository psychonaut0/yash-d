const asyncHandler = require("express-async-handler")
const passport = require("passport")
const User = require("../models/user")
const { encryptPassword } = require("../utils/password")

const registerUser = asyncHandler(
  async (req, res, next) => {
    const encryptedPasswordData = encryptPassword(req.body.password)

    const user = await User.create({
      username: req.body.username,
      hash: encryptedPasswordData.hash,
      salt: encryptedPasswordData.salt
    })

    res.status(201).json(user)
  }
)


module.exports = {
  registerUser
}