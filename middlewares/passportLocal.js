const LocalStrategy = require('passport-local').Strategy

const passport = require('passport')
const userr = require('../models/userSchema');

passport.use('user',new LocalStrategy({
    usernameField: 'email',
},async (email, password, done) => {
    
    try {
        let User = await userr.findOne({ email })

        if (User) {
            if (User.password == password) {
                done(null, User)
            }
            else {
                done(null, false)
            }
        }
        else {
            done(null, false)
        }

    } catch (error) {
        done(error, false)
    }
}));

passport.serializeUser((User, done) => {
    return done(null, User.id)
})

passport.deserializeUser(async (id, done) => {
    let User = await userr.findById(id)
    return done(null, User)
})

passport.userPassportAuth = (req, res, next) => {
    console.log(req.body);
    
    if (!req.isAuthenticated()) {
        return res.redirect('/user/login')
    }
    next()
    // console.log(error);
}

    
module.exports = passport
