import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import createError from 'http-errors';
import validator from 'validator';


export const login = async (req, res, next) => {
    let { email, password } = req.body
    
    try {
        email = email.toLowerCase();
        if (!validator.isEmail(email)) throw createError.BadRequest('Please, enter a valid email address');
        const user = await User.findOne({ email });
        if (!user) throw createError.Unauthorized('Invalid email or password.');
        
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) throw createError.Unauthorized('Invalid login details.');

        const token = jsonwebtoken.sign({ name: user.name, email: user.email, id: user._id }, process.env.SECRETJWT, { expiresIn: '1hr'});
        res.status(200).json({ message: 'Login successful.', result: {user, token}, success: true });
    } catch (error) {
        return next(error)
    }

};

export const signup = async (req, res, next) => {
    const {firstname, lastname, password, confirmPassword } = req.body;
    let email = req.body.email.toLowerCase();
    try {
        if(!firstname || !lastname || !email || !password || !confirmPassword) throw createError.BadRequest('All fields are required');
        const name = `${firstname} ${lastname}`
        
        if (!validator.isEmail(email)) throw createError.BadRequest('Please enter a valid email address');

        // Check if user email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.email === email) throw createError.Conflict('Email already exists');
        };

        // Encrypt user password and save user details to the database
        if (password.length < 8 || password.length > 15) throw createError.BadRequest('Password length must be between 8-15.');
        if (!(password.toLowerCase() == confirmPassword.toLowerCase())) throw createError.BadRequest('Passwords do not match.');
        const salt = await bcrypt.genSalt();
        const encryptUserPassword = await bcrypt.hash(password, salt);
        const userDetails = { name, email, password: encryptUserPassword};
        const user = await new User(userDetails);
        await user.save();
        return res.status(200).json({ message: 'User profile created successfully.', success: true });
    } catch (error) {
        return next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        // if (!req.userId) return res.status(401).json({ message: 'Please, login to view all users', success: false });
        const users = await User.find();
        if (!users || users.length === 0) throw createError.NotFound('No user found!');
        return res.status(200).json({ success: true, message: 'Users successfully fetched', users });;
    } catch (error){
        return next(error)
    }
}