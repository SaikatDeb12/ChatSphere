import { Schema, model, Types } from "mongoose";

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

const UserSchema = new Schema<IUser>(
    {
        name: { type: String },
        email: { type: String, unique: true },
        emailVerified: { type: Boolean },
        image: { type: String },
        hashedPassword: { type: String },
        conversationsId: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
        seenMessagesId: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    { timestamps: true },
);

export const UserModel = model<IUser>("User", UserSchema);
