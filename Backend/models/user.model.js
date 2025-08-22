import { Schema, model } from "mongoose";

const userSchema = new Schema({

    username: String,
    email: String,
    password: String,
    bio: { type: String, default: "" },               // short user bio
    skills: [{ type: String }],                       // ["React","Node"]

    
    createAt:{
        type: Date,
        default: Date.now
    },
    profilePicture: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        }
    }

})

const User = model('User', userSchema);
export default User;



