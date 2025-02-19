import {otpEmailTemplate, signUpEmailTemplate} from "./emailTemplate.js";
import {SENDER_EMAIL} from "../config/env.js";
import transporter from "../config/nodemailer.js";
import {generateOTP, storeOTP} from "./otpService.js";

export const sendSignUpMail = async ({userName, userEmail}) => {
    try{
        // Generate email Subject
        const emailSubject = signUpEmailTemplate.generateEmailSubject({
            appName: 'Blossom Children Clinic'
        })

        //Generate email Body
        const emailBody = signUpEmailTemplate.generateEmailBody({
            appName: 'Blossom Children Clinic',
            userName,
            year: `2025`
        })

        // Curate Personalised Email Options
        const mailOptions = {
            to: userEmail,
            from: SENDER_EMAIL,
            subject: emailSubject,
            html: emailBody
        }

        await transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                throw error;
            }
            console.log(`Signup email sent: ${info.response}`);
        })
    }
    catch (error) {
        console.log(`Error while sending Signup email: ${error}`);
    }
}

export const sendOTPMail = async ({userEmail}) => {
    try{
        // Generate email Subject
        const emailSubject = otpEmailTemplate.generateEmailSubject({
            appName: 'Blossom Children Clinic'
        })

        // Generate OTP
        const OTP = generateOTP();
        console.log(`OTP: `, OTP)

        // Store OTP in redis in-memory cache
        await storeOTP(userEmail, OTP);

        //Generate email Body
        const emailBody = otpEmailTemplate.generateEmailBody({
            appName: 'Blossom Children Clinic',
            OTP,
            validTime: 5, //Valid Minutes
            year: `2025`
        })

        // Curate Personalised Email Options
        const mailOptions = {
            to: userEmail,
            from: SENDER_EMAIL,
            subject: emailSubject,
            html: emailBody
        }

        await transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                throw error;
            }
            console.log(`OTP email sent: ${info.response}`);
        })
    }
    catch (error) {
        console.log(`Error while sending OTP email: ${error}`);
    }
}
