import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postMessageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        default: "Orobola Roland",
        required: true
    },
    tags: {
        type: [],
        required: true
    },
    selectedFile: {
        type: String,
    },
    likeCount: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

const PostMessage = mongoose.model('Post', postMessageSchema);

export default PostMessage