import {verifyOTP} from "../utils/otpService.js";
import User from "../models/user.model.js";

const getUser = async(req, res, next) => {
    try
    {
        const userData = req.user;
        res.status(200).json({
            status: true,
            data: {
                user: userData
            }
        })
    }
    catch(error)
    {
        next(error);
    }
}

const verifyUser = async(req, res, next) => {
    try {
        if(req.user.verified)
        {
            res.status(400).json({
                success: false,
                message: 'User is already verified'
            });
        }

        const { userOtp } = req.body;
        if (!userOtp) {
            const error = new Error('Invalid OTP');
            error.statusCode = 401;
            throw error;
        }

        const { email } = req.user;
        if (!email) {
            const error = new Error('Not a valid email');
            error.statusCode = 401;
            throw error;
        }


        const otpStatus = await verifyOTP(email, userOtp);
        if(!otpStatus.success) {
            res.status(400).json(otpStatus);
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    verified: otpStatus.success,
                }
            },
            {
                new: true
            }
        ).select('-password');

        res.status(201).json({
            success: true,
            data: {
                user
            }
        });
    }
    catch(error) {
        next(error);
    }
}

export {
    getUser,
    verifyUser
}
