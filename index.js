const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')
const db = require('./config/database')

const session = require('express-session')
const LocalStrategy = require('./middlewares/passportLocal')
const passport = require('passport')

const port = 8081

const app = express()

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname + '/assets')))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    name:'user',
    secret: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',require('./routers'))

app.listen(port,(err)=>{
    if(!err){
        db()
        console.log('Server Running on Port\nhttp://localhost:'+ port)
    }
})