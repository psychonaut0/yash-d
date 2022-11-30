const passport = require('passport')
const { registerUser } = require('../controller/user')

const router = require('express').Router()

router.route('/login').post(passport.authenticate('local' ), (req, res) => {

  res.status(200).json(req.user)
})
router.route('/register').post(registerUser)

module.exports = router