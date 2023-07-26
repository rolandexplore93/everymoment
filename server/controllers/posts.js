import express from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find();
        if (!posts) return res.status(404).json({ message: 'No post found!', success: false });
        return res.status(200).json({ success: true, message: 'Posts successfully fetched', posts });;
    } catch (error){
        console.log(error.message);
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}

export const createPost = async (req, res) => {
    const newPost = {...req.body, tags: req.body.tags.split(',').map(tag => tag.trim())};
    // const post = {...req.body, tags: req.body.tags.split(',').map(tag => tag.trim().replaceAll("-", " "))};
    try {
        if (!newPost.title || !newPost.message || !newPost.creator) return res.status(400).json({ message: 'Title, Message and Creator fields must be filled', success: false })
        const post = await new PostMessage(newPost);
        await post.save()
        return res.status(201).json({message: 'Your post has been created', success: true, post})
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

export const editPost = async (req, res) => {
    const _id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Post id is not valid', success: false});
        const formatTags = req.body.tags.toString().split(',').map(tag => tag.trim().replaceAll('-',' '));
        const post = {...req.body, tags: formatTags};
        const postUpdated = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
        if (!postUpdated) return res.status(404).json({message: `Post doesn't exit in the database.`, success: false });
        return res.status(200).json({message: 'Post updated...', postUpdated, success: true})
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

export const likePost = async (req, res) => {
    const { id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Invalid post id');
    try {
        const post = await PostMessage.findById(_id);
        if (post === null) return res.status(404).json({message: `Post id:${_id} doesn't exist in the database.`});
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1}, { new: true });
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Invalid post id');

    try {
        const removePost = await PostMessage.findByIdAndDelete(_id);
        if (removePost === null) return res.status(404).json({message: `Post id:${_id} doesn't exit in the database.`});
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