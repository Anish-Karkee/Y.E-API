import mongoose from "mongoose";
import User from "./User";


const testimonySchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


export default testimonySchema;