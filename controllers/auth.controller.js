import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";
import cookieOptions from "../config/cookieConfig.js";
import {sendSignUpMail} from "../utils/sendMail.js";


const signUp = async function(req, res, next) {
    // Creating session for MongoDB to make sure the DB operation either fails for succeeds
    const session = await mongoose.startSession();
    // Start DB Transaction
    session.startTransaction();

    try
    {
        // Extract user details from request body
        const { username, email, password } = req.body;

        //Check if user already has account
        const existingUser = await User.findOne({email});

        if(existingUser)
        {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const {username : userName, email : userEmail} = await User.create({username, email, password: hashedPassword});

        await session.commitTransaction();
        await session.endSession();

        // Send an email just before sending response for successful signup
        await sendSignUpMail({userName, userEmail})

        res.status(201).json({
            success: true,
            message: "Account created successfully",
        })
    }
    catch(error)
    {
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

const logIn = async function(req, res, next) {
    try
    {
        const {email, password: loginPassword } = req.body;

        const user = await User.findOne({email});
        if(!user)
        {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
        if(!isPasswordValid)
        {
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }

        const token = await jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie("accessToken", token, cookieOptions);

        const { password, ...responseUser } = user.toObject();

        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: {
                user: responseUser
            }
        })
    }
    catch(error)
    {
        next(error);
    }
}

const logOut = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({
            success: true,
            message: "Successfully logged out",
        })
    }
    catch (error) {
        next(error);
    }
}

export {
    signUp,
    logIn,
    logOut,
};
