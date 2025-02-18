import nodemailer from "nodemailer";
import {APP_PASSWORD, SENDER_EMAIL} from "./env.js";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SENDER_EMAIL,
        pass: APP_PASSWORD,
    }
})

export default transporter;
