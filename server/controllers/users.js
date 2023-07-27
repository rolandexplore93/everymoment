import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import bcyprt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

// console.log(process.env.SECRETJWT)

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({message: "User doesn't exist... Please Sign up!"});
        const isPasswordCorrect = await bcyprt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid login credentials"});
        
        // Create a jwt token to determine the duration which a user stays login
        const token = jsonwebtoken.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRETJWT, { expiresIn: '180secs'});
        res.status(200).json({ message: existingUser, token})
    } catch (error) {
        res.status(500).json("Server error. Please, try again.")
    }

}

export const signup = async () => {
    const {firstname, lastname, email, password, confirmPassword } = req.body;
    const name = `${firstname} ${lastname}`

}