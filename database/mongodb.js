import mongoose from "mongoose";
import {MONGODB_URI, NODE_ENVIRONMENT} from "../config/env.js";

if(!MONGODB_URI)
{
    throw new Error("MongoDB URI is missing");
}

const connectToDatabase = async () => {
    try
    {
        await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB connected successfully in ${NODE_ENVIRONMENT} mode`);
    }
    catch(error)
    {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectToDatabase;
