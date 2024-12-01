const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    phone: Number
},{
    timestamps: true
})
const userr = mongoose.model("usersssModels", userSchema)

module.exports = userr