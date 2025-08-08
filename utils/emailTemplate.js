// Signup Email Config

const generateSignUpEmailTemplate = ({appName, userName, year }) => {
    return `
        <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; 
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center; font-family: Arial, sans-serif; 
        background-color: #f4f4f4;">
        <div style="background-color: #007bff; color: #ffffff; padding: 15px; font-size: 24px; border-radius: 8px 8px 0 0;">
            Welcome to ${appName}!
        </div>
        <div style="padding: 20px; color: #333;">
            <h2 style="margin-top: 0;">Congratulations, ${userName}!</h2>
            <p>You've successfully signed up for <strong>${appName}</strong>. We're thrilled to have you on board!</p>
            <p>Click below to access your account:</p>
            <a href="https://blossomclinics.in" style="display: inline-block; margin-top: 20px; padding: 12px 20px; font-size: 16px; 
                color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                Login
            </a>
            <p style="margin-top: 20px;">If you have any questions, feel free to reach out to our support team.</p>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #777;">
            &copy; ${year} ${appName}. All rights reserved.
        </div>
    </div>
    `;
}

export const signUpEmailTemplate = {
    label: 'SignUp Successful',
    generateEmailSubject : (data) => {
        return `"🎉 Welcome to ${data.appName}! Your Account is Ready!"`
    },
    generateEmailBody: (data) => {
        return generateSignUpEmailTemplate({...data});
    }
}


// OTP email config

const generateOTPEmailTemplate = ({appName, OTP, validTime, year}) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Verification</title>
            </head>
            <body>
                <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; 
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center; font-family: Arial, sans-serif; 
                    background-color: #f4f4f4;">
                    <div style="background-color: #007bff; color: #ffffff; padding: 15px; font-size: 24px; border-radius: 8px 8px 0 0;">
                        Verify Your Account
                    </div>          
                    <div style="padding: 20px; color: #333;">
                        <h2 style="margin-top: 0;">Your OTP Code</h2>
                        <p>Use the OTP below to verify your account on <strong>${appName}</strong> website: </p>
                        <div style="font-size: 24px; font-weight: bold; background: #f8f9fa; display: inline-block; padding: 10px 20px; 
                            border-radius: 5px; margin: 20px 0; color: #007bff;">
                            ${OTP}
                        </div>          
                        <p>This OTP is valid for <strong>${validTime} Minutes</strong>. Do not share it with anyone.</p>
                        <p>If you didn't request this, please ignore this email.</p>
                    </div>           
                    <div style="margin-top: 20px; font-size: 12px; color: #777;">
                        &copy; ${year} ${appName}. All rights reserved.
                    </div>       
                </div>
            </body>
        </html>
    `;
}

export const otpEmailTemplate = {
    label: 'OTP Email',
    generateEmailSubject : (data) => {
        return `Your ${data.appName} OTP Code – Verify Your Account Now!`;
    },
    generateEmailBody: (data) => {
        return generateOTPEmailTemplate({...data});
    }
}
