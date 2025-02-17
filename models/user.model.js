import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [6, 'Username must be at least 6 characters'],
        maxlength: 25,
        trim: true,
        unique: [true, 'Username already in use'],
        index: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        toLowerCase: true,
        unique: [true, 'Email already in use'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    profilePicture: {
        type: String, // URL (Store in Storage Provider like Cloudinary)
    },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;
