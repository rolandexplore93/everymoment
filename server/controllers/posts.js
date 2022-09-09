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

export const deleteAllPosts = async (req, res) => {
    try {
        const allPosts = await PostMessage.remove({});
        res.status(200).json({ message: 'All posts deleted from the database', posts: allPosts })
    } catch (error){
        res.status(400).json({ message: error.message})
    }
};