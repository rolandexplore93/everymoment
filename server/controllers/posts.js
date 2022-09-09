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
    res.status(200).json({message: 'Post updated...', updatedPost})
}

export const deleteAllPosts = async (req, res) => {
    try {
        const allPosts = await PostMessage.deleteMany({});
        res.status(200).json({ message: 'All posts deleted from the database', posts: allPosts })
    } catch (error){
        res.status(400).json({ message: error.message})
    }
};