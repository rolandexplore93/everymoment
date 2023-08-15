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
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
        // default: "Orobola Roland",
    },
    tags: [{
            type: String,
            required: true
    }],
    selectedFile: {
        type: String,
    },
    likes: {
        type: [String],
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    }
}, {timestamps: true})

const PostMessage = mongoose.model('Post', postMessageSchema);

export default PostMessage