import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
