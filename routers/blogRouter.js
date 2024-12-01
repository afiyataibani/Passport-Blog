const { Router } = require("express")
const blogCtl = require('../controllers/blogController')
const passport = require("passport")

const blogRouter = Router()

blogRouter.get('/add_blog',passport.userPassportAuth, blogCtl.add_blogPage)
blogRouter.post('/add_blog',blogCtl.add_blog)

blogRouter.get('/view_blog', blogCtl.view_blogPage)

blogRouter.get("/delete_blog/:adminId", blogCtl.delete_blog)

blogRouter.get("/edit_blog/:adminId", blogCtl.edit_blogPage)
blogRouter.post("/edit_blog/:adminId", blogCtl.edit_blog)

blogRouter.get('/all_blog', blogCtl.all_blogPage)

blogRouter.get('/:id',blogCtl.likeBlog)


module.exports = blogRouter