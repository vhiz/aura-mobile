import { Schema, model } from "mongoose";


const commentSchema = new Schema({
    desc: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    postId: {
        type: String,
        require: true
    }
}, { timestamps: true })

export default model('Comments', commentSchema)