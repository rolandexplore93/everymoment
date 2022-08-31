import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postMessageSchema = new Schema({
    title: {
        type: String
    },
    message: {
        type: String,
    },
    creator: {
        type: String,
        default: "Orobola Roland"
    },
    tags: {
        type: []
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