const blogs = require("../models/blogSchema")

module.exports.add_blogPage = (req, res) => {
    let { _id:adminId } = req.user
    console.log(adminId)
    return res.render('./pages/add_blog', {
        adminId
    })
}

module.exports.view_blogPage = async (req, res) => {
    try {
        let { _id:adminId } = req.user
        let data = await blogs.find({ adminId })
        console.log(data)
        return res.render('./pages/view_blog', { data })
    } catch (error) {
        console.log(error)
        return res.render('./pages/view_blog')
    }
}

module.exports.add_blog = async (req, res) => {
    try {
        await blogs.create(req.body)
        console.log("Blog created.")
        return res.redirect('back')
    } catch (error) {
        console.log(error)
        return res.redirect('back')
    }
}


module.exports.delete_blog = async(req,res) => {
    try {
        let { adminId } = req.params
        await blogs.findByIdAndDelete(adminId)
        console.log("Blog Deleted..")
        return res.redirect('back')
    } catch (error) {
        console.log(error)
        return res.redirect('back')
    }
}

module.exports.edit_blogPage = async (req, res) => {
    try {
        let { adminId } = req.params
        let data = await blogs.findById(adminId)
        return res.render('./pages/edit_blog', { data })
    } catch (error) {
        console.log(error)
        return res.render('./pages/edit_blog')
    }

}

module.exports.edit_blog = async (req, res) => {
    try {
        let { editId } = req.body
        let data = await blogs.findByIdAndUpdate(editId, req.body)
        return res.redirect("/blog/view_blog")
    } catch (error) {
        console.log(error)
        return res.redirect("/blog/view_blog")
    }
}

module.exports.all_blogPage = async (req, res) => {
    try {
        let { _id:adminId } = req.user
        let data = await blogs.find({})
        console.log(data);
        
        return res.render('./pages/all_blog', { data,adminId })
    } catch (error) {
        console.log(error)
        return res.render('./pages/all_blog')
    }
}

module.exports.likeBlog = async (req, res) => {
    try {
        let { id } = req.params
        let blog = await blogs.findById(id)
        let { _id:adminId } = req.user
        let adminIndex = blog.likeBy.indexOf(adminId)
        console.log(blog)

        if (adminIndex == -1) {
            blog.likeBy.push(adminId)
        }
        else {
            blog.likeBy.splice(adminIndex, 1)
        }
        await blog.save()

        return res.redirect('/blog/all_blog')
    } catch (error) {
        console.log(error)
        return res.redirect('/blog/all_blog')
    }
}