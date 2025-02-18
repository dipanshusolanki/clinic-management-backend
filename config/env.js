import {config} from "dotenv";

config({path: `.env.${process.env.NODE_ENVIRONMENT || 'development'}.local`,})

export const {
    PORT,
    NODE_ENVIRONMENT,
    MONGODB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    SENDER_EMAIL,
    APP_PASSWORD
} = process.env
