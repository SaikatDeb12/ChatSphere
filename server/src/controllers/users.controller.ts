import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const client = new MongoClient(process.env.MONGODB_URL as string);
        const db = client.db("app");
        const collection = db.collection("users");
        const filter = req.query.filter || "";
        const query = {
            name: { $regex: filter },
        };
        const users = await collection.find(query).toArray();
        res.json({
            users: users.map((user) => ({
                name: user.name,
                // image: user.image,
                // conversations: user.conversationsId,
                // seenMessages: user.seenMessagesId,
            })),
        });
    } catch (err) {
        res.status(500).json({ msg: "Internal server error" });
    }
};

export default getAllUsers;
