import {Schema, model} from 'mongoose'

const User_stausSchema = new Schema ({
    ig: {
        type: String,
        required: true,
        tirm: true
    },
    followers: {
        type: String,
        required: true,
        tirm: true
    },
    posts: {
        type: Number,
        required: true,
        tirm: true
    }
}, {
    versionKey: false
});

export default model('status', User_stausSchema);

