import { Schema, model, Types } from "mongoose";

export interface MessageType extends Document {
    content?: string;
    image?: string;
    createdAt: Date;
    seenIds: Types.ObjectId[];
    conversationId: Types.ObjectId;
    senderId: Types.ObjectId;
}

const MessageSchema = new Schema<MessageType>({
    content: String,
    image: String,
    createdAt: { type: Date, default: Date.now() },
    seenIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    conversationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Conversation",
    },
    senderId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export const MessageModel = model<MessageType>("Message", MessageSchema);
