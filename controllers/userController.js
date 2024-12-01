const userr = require('../models/userSchema')

module.exports.signupPage = (req, res) => {
    return res.render('./pages/signup')
}

module.exports.signup = async (req, res) => {
    try {
        let data = await userr.create(req.body)
        console.log("User Created.")
        return res.redirect('/user/login')
    } catch (error) {
        console.log(error)
        if (error.key.username) {
            console.log(error.MongoServerError)
        }
        return res.redirect('/user/signup')
    }
}

module.exports.loginPage = (req, res) => {
    return res.render('./pages/login')
}

module.exports.logout = (req, res) => {
    req.logout(() => {
        return res.redirect('/user/login')
    })
}

