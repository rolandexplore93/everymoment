import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postMessageSchema = new Schema({
    title: {
        type: String
    },
    message: {
        type: String,
    },
    postCreator: {
        type: String,
        default: "Orobola Roland"
    },
    tags: {
        type: []
    },
    filesUpload: {
        type: String,
    },
    likeCount: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

const PostMessage = mongoose.model('PostMessage', postMessageSchema);

export default PostMessage