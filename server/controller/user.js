const asyncHandler = require("express-async-handler")
const passport = require("passport")
const User = require("../models/user")
const { encryptPassword } = require("../utils/password")

/**
 * - Method POST
 * - Register a new user
 * @function setGroup
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
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


const getUser = asyncHandler(
  async (req, res) => {
    if(!req.session?.passport?.user){
      res.status(401)
      throw new Error("You're not logged in")
    }

    const user = await User.findById(req.session.passport.user)
    res.status(200).json(user)
  }
)

module.exports = {
  registerUser,
  getUser
}