const passport = require('passport')
const { registerUser } = require('../controller/user')

const router = require('express').Router()

router.route('/login').post(passport.authenticate('local' ), (req, res) => {
  res.status(200).json(req.user)
})
router.route('/register').post(registerUser)

router.route('/logout').post((req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err)
    }
    res.status(200).json({
      message: "successfully logged out!"
    })
  })
})

module.exports = router