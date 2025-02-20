import redisClient from "../config/redis.js";

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const verifyOTP = async (email, userOTP) => {
    const storedOTP = await getStoredOTP(email);

    if (!storedOTP) {
        return { success: false, message: "OTP expired or invalid" };
    }

    if(storedOTP !== userOTP) {
        return { success: false, message: "Wrong OTP entered" };
    }

    await deleteOTP(email);
    return { success: true, message: "OTP verified successfully" };
}

const storeOTP = async (email, otp) => {
    await redisClient.set(`otp:${email}`, otp, { EX: 300}) // Expires after 5 mins
}

const getStoredOTP = async (email) => {
    return await redisClient.get(`otp:${email}`);
}

const deleteOTP = async (email) => {
    await redisClient.del(`otp:${email}`);
}

export {
    verifyOTP,
    generateOTP,
    storeOTP,
    getStoredOTP,
    deleteOTP,
};
