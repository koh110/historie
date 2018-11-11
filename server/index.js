// @ts-check

const http = require('http')
const express = require('express')
const session = require('express-session')
require('dotenv').config()

const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env

const dev = process.env.NODE_ENV !== 'production'

const app = express()
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const { User } = require('./model')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: !dev }
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
})

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:8080/auth/twitter/callback',
    includeEmail: true
  }, (token, tokenSecret, profile, done) => {
    User.findOrCreate({ twitterId: profile.id, name: profile.displayName })
      .then(user => done(null, { id: user.id }))
      .catch(err => done(err))
  }
))

app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }))
app.get('/api/@me', (req, res) => {
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    res.status(403).send('not authrized')
  }
})
app.get('/', app.use(express.static('static')))

const server = http.createServer(app)
server.listen(8080, () => {
  console.log('Listening on', server.address())
})
