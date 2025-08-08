import mongoose, {Mongoose} from "mongoose";

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postContent: {
        type: String,
        required: true,
    },
    postMedia: {
        type: [String], // Array of Media URLs
        default: [],
    },
    postStatus: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE',
    },
    postVisibility: {
        type: String,
        enum: ['PUBLIC', 'PRIVATE'],
        default: 'PUBLIC',
    },
    postCategory: {
        type: String,
        default: 'ALL',
    },
    postTags: {
        type: [String],
        default: [],
    },
    postLikes: {
        type: Number,
        default: 0,
    },
    postComments: {
        type: [String],
        default: [],
    },
    postShares: {
        type: Number,
        default: 0,
    },
    postViews: {
        type: Number,
        default: 0,
    },
    postAuthor: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
