const { Router } = require('express')
const adminPanelController = require('../controllers/adminPanelController')
const  passport  = require('passport')
const adminPAnelRouter = Router()

adminPAnelRouter.get('/',passport.userPassportAuth,adminPanelController.indexPage)

module.exports = adminPAnelRouter