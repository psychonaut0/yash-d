const session = require('express-session');
const { createClient } = require('redis');
let RedisStore = require('connect-redis')(session)

const redisSession =  () => {
  
  const client = createClient({
    legacyMode: true,
    url: process.env.REDIS_URI
  });

  client.connect();
  
  console.log(`Redis connected`.cyan.underline)

  return session({
    secret: `${process.env.SESSION_SECRET}`,
    store:  new RedisStore({client: client}),
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
}

module.exports = {
  redisSession
}