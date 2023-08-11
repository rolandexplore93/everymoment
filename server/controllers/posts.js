import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

// export const getPosts = async (req, res) => {
//     try {
//         const posts = await PostMessage.find();
//         if (!posts) return res.status(404).json({ message: 'No post found!', success: false });
//         return res.status(200).json({ success: true, message: 'Posts successfully fetched', posts });;
//     } catch (error){
//         console.log(error.message);
//         return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
//     }
// };

export const getPosts = async (req, res) => {
    const { page } = req.query;
    console.log(req.query)
    try {
        const numberOfPostPerPage = 4;
        const startIndexOfEveryPage = (Number(page) - 1) * numberOfPostPerPage;
        const totalPosts = await PostMessage.countDocuments({})
        console.log(totalPosts)
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(numberOfPostPerPage).skip(startIndexOfEveryPage);
        if (!posts) return res.status(404).json({ message: 'No post found!', success: false });
        return res.status(200).json({ success: true, message: 'Posts successfully fetched', posts, currentPage: Number(page), numberOfPages: Math.ceil(totalPosts/numberOfPostPerPage) });;
    } catch (error){
        console.log(error.message);
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags} = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); // i means ignore case sensitivity
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] })
        if (!posts || posts.length === 0) return res.status(404).json({ message: 'No post found!', success: false });
        return res.status(200).json({ success: true, message: 'Posts matched.', posts });;
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}

export const createPost = async (req, res) => {
    const newPost = {...req.body, creator: req.userId, tags: req.body.tags.split(',').map(tag => tag.trim().replaceAll("-", " "))};
    try {
        if (!newPost.title || !newPost.message ) return res.status(400).json({ message: 'Title, Message and Creator fields must be filled', success: false })
        const post = await new PostMessage(newPost);
        await post.save()
        return res.status(201).json({ message: 'Your post has been created', success: true, post })
    } catch (error) {
        return res.status(500).json({ error: { message: error.message, success: false } })
    }
}

export const editPost = async (req, res) => {
    const _id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Post id is not valid', success: false});
        const formatTags = req.body.tags.toString().split(',').map(tag => tag.trim().replaceAll('-',' '));
        const post = {...req.body, creator: req.userId, tags: formatTags};
        const postUpdated = await PostMessage.findByIdAndUpdate(_id, {...post, _id }, { new: true })
        if (!postUpdated) return res.status(404).json({ message: `Post doesn't exist in the database.`, success: false });
        return res.status(200).json({ message: 'Post updated...', postUpdated, success: true})
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

export const likePost = async (req, res) => {
    const _id = req.params.id;
    
    try {
        if (!req.userId) return res.status(401).json({ message: 'Please, login to like this post', success: false });
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Invalid post id', success: false });
        const post = await PostMessage.findById(_id);
        if (!post) return res.status(404).json({message: `Post id:${_id} doesn't exist in the database.`, success: false});

        // Check if the user id is already in the likes section or not
        const index = post.likes.findIndex((id) => id === String(req.userId))
        console.log(index)
        if (index === -1){
            // like the post and increase the post count
            post.likes.push(req.userId);
            post.likeCount = post.likeCount + 1;
        } else {
            // dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
            post.likeCount = post.likeCount - 1;
        }
        console.log(post.likes)
        console.log(post.likeCount)
        const updatedPostLikeCount = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        // const updatedPostLikeCount = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1}, { new: true });
        return res.status(200).json({message: 'Post updated...', updatedPostLikeCount, success: true})

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deletePost = async (req, res) => {
    const _id = req.params.id;
    try {
        // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Invalid post id', success: false });
        const removePost = await PostMessage.findByIdAndDelete(_id);
        if (!removePost) return res.status(404).json({message: `Post id:${_id} doesn't exit in the database.`});
        res.status(200).json({message: `Post id:${_id} deleted from the database.`});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteAllPosts = async (req, res) => {
    try {
        const allPosts = await PostMessage.deleteMany({});
        res.status(200).json({ message: 'All posts deleted from the database', posts: allPosts })
    } catch (error){
        res.status(400).json({ message: error.message})
    }
};