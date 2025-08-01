import { Types, Schema, model } from "mongoose";

export interface ConversationType extends Document {
    name?: string;
    isGroup?: string;
    createdAt: Date;
    lastMessageAt: Date;
    messageIds: Types.ObjectId[];
    userIds: Types.ObjectId[];
}

const conversationSchema = new Schema<ConversationType>({
    name: { type: String },
    isGroup: { type: String },
    createdAt: { type: Date, default: Date.now() },
    lastMessageAt: { type: Date, default: Date.now() },
    messageIds: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Conversation = model<ConversationType>(
    "Conversation",
    conversationSchema,
);
