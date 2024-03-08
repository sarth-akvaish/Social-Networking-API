import mongoose from 'mongoose';

const { Schema } = mongoose;

const followerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Follower = mongoose.model('Follower', followerSchema);

export default Follower;
