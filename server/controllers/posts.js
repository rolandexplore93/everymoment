import express from 'express';
import PostMessage from "../models/postMessage.js"

// console.log(postMessage)

export const getPosts = async (req, res) => {
    try {
        const allPosts = await PostMessage.find();
        console.log(allPosts)

        res.status(200).json(allPosts)
    } catch (error){
        console.log(error)
    }
}

export const createPost = async (req, res) => {
    const body = req.body
    const newPost = new PostMessage(body);

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}
