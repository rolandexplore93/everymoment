import express from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const allPosts = await PostMessage.find();
        res.status(200).json(allPosts)
    } catch (error){
        console.log(error)
    }
}

export const createPost = async (req, res) => {
    const body = req.body
    const newPost = await new PostMessage(body);

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

export const editPost = async (req, res) => {
    const _id = req.params.id;
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Post id not found');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
    if (updatedPost === null) return res.status(404).json({message: `Post id:${_id} doesn't exit in the database.`});
    res.status(200).json({message: 'Post updated...', updatedPost})
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Invalid post id');

    try {
        const deletedPost = await PostMessage.findByIdAndDelete(_id);
        if (deletedPost === null) return res.status(404).json({message: `Post id:${_id} doesn't exit in the database.`});
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