import express from 'express';
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
    const {title, message, creator, tags, selectedFile, likeCount} = req.body

    try {
        const post = await PostMessage.updateOne({_id}, {$set: {title, message, creator, tags, selectedFile, likeCount}})
        res.status(200).json({message: 'Post updated...', post})
    } catch (error) {
        res.status(400).json({ message: error.message})
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