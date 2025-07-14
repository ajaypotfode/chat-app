import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "UserName is Required"]
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: [true, "email has to be Unique"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bio: {
        type: String,
        default: "Hey I am Using, Chat Box"
    },
    image: {
        type: String,
        default: '/images/profile-image.png'
    }
})

const User = mongoose.models.chatusers || mongoose.model("chatusers", userSchema)

export default User