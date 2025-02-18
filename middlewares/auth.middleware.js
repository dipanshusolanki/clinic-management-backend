import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";

const authMiddleware = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if(!accessToken){
            const error = new Error('Access Token is missing');
            error.status = 409;
            throw error;
        }

        const token = await jwt.verify(accessToken, JWT_SECRET);

        if(!token){
            const error = new Error('Invalid/Corrupted JWT Token');
            error.status = 409;
            throw error;
        }

        const { id } = req.params;

        if(id !== token.userId)
        {
            const error = new Error('Unauthorized: User details inaccessible');
            error.status = 409;
            throw error;
        }

        const user = await User.findById(token.userId);
        if(!user){
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        
        const {password, ...userDetails} = user.toObject();
        req.user = userDetails;
        
        next();
    }
    catch (error) {
        next(error);
    }
}

export default authMiddleware;
