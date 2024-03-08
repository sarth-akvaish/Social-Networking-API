import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePicURL: {
        type: String,
        default: 'default_profile_pic_url.jpg'
    },
    bio: {
        type: String,
        default: ''
    }
});

const profileModel = model('Profile', profileSchema);

export default profileModel;
