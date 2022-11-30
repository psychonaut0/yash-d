const asyncHandler = require('express-async-handler')

const passport = require('passport')
const User = require('../models/user')
const { validatePassword } = require('../utils/password')
const LocalStrategy = require('passport-local').Strategy

passport.use(
  new LocalStrategy(
    asyncHandler(
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username: username })

          if (!user) {
            return done(null, false)
          }

          const isValid = validatePassword(password, user.hash, user.salt)

          if (isValid) {
            return done(null, user)
          }
          else {
            return done(null, false)
          }
        }
        catch (err) {
          done(err)
        }
      }
    )
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(
  asyncHandler(
    async (userId, done) => {
      try {
        const user = await User.findById(userId)
        done(null, user)
      }
      catch (err) {
        done(err)
      }
    }
  )
)