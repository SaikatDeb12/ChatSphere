import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export function connectToDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL as string);
        console.log("MongoDB connected");
    } catch (err) {
        console.log("Error: ", err);
    }
}
