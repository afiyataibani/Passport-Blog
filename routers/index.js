const { Router } = require("express");
const adminPAnelRouter = require('./adminPanelRouter')
const blogRouter = require('./blogRouter')
const userRouter = require('./userRouter')

const router = Router()

router.use('/',adminPAnelRouter)
router.use('/user',userRouter)
router.use('/blog', blogRouter)

module.exports = router