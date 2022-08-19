import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postMessageSchema = new Schema({
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    postCreator: {
        type: String,
    },
    tags: {
        type: []
    },
    filesUpload: {
        type: String,
    },
    likeCount: {
        type: Number,
    },
}, {timestamps: true})

const PostMessage = mongoose.model('PostMessage', postMessageSchema);

export default PostMessage