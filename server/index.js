require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const auth = require('./auth/authCtrl')
const main = require('./game/mainCtrl')
const game = require('./game/gameCtrl')
const profile = require('./game/profileCtrl')
const app = express()
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`⋰⋰⋱  ${SERVER_PORT}`)
    })
}).catch(err => console.log(err))

//  MAIN ENDPOINTS
app.get('/api/rules', main.getRules)

//  POKER ENDPOINTS
// app.post('/api/start', game.startGame)
app.get('/api/deck', game.shuffle)
// app.get('/api/test-shuffle', game.shuffleTest)
app.post('/api/poker/:id', game.newGame)
app.put('/api/entry-fee/:id', game.payToPlay)

//  ACCOUNT ENDPOINTS
app.put('/api/picture/:id', profile.editPic)
app.get('/api/picture/:id', profile.getPic)
app.get('/api/stats/:id', profile.getStats)

//  AUTH ENDPOINTS
app.post('/api/register', auth.register)
app.post('/api/login', auth.login)
app.get('/api/logout', auth.logout)