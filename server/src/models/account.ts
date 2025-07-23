import { Schema, Types, model } from "mongoose";

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

const AccountSchema = new Schema<AccountType>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    type: { type: String, required: true },
    provider: { type: String, requried: true },
    providerAccountId: { type: String, required: true },
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
});

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });
export const AccountModel = model<AccountType>("Account", AccountSchema);
