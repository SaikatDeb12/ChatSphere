import { Types } from "mongoose";

export interface AccountType extends Document {
    userId: Types.ObjectId;
    type: string;
    provider: string;
    providerAccountId: string;
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
}

export interface ConversationType extends Document {
    name?: string;
    isGroup?: string;
    createdAt: Date;
    lastMessageAt: Date;
    messageIds: Types.ObjectId[];
    userIds: Types.ObjectId[];
}

export interface MessageType extends Document {
    content?: string;
    image?: string;
    createdAt: Date;
    seenIds: Types.ObjectId[];
    conversationId: Types.ObjectId;
    senderId: Types.ObjectId;
}

export interface IUser extends Document {
    name?: string;
    email?: string;
    emailVerified?: boolean;
    image?: string;
    hashedPassword?: string;
    createdAt: Date;
    updatedAt: Date;
    conversationsId: Types.ObjectId[];
    seenMessagesId: Types.ObjectId[];
}
