import {signUpEmailTemplate} from "./emailTemplate.js";
import {SENDER_EMAIL} from "../config/env.js";
import transporter from "../config/nodemailer.js";

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
            console.log(`Email sent: ${info.response}`);
        })
    }
    catch (error) {
        console.log(`Error while sending email: ${error}`);
    }
}
