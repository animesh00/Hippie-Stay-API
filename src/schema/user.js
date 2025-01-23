import { Schema } from "mongoose";

const UserSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isVerified: { type: Boolean, default: false },
        phone: { type: String, required: true, match: /^\d{10,15}$/ },
        resetPasswordExpires: { type: Date, default: null },
        verificationToken: { type: String, required: false },
        resetPasswordOTP: { type: Number, min: 100000, max: 999999, default: null },
    },
    { timestamps: true }
);

export default UserSchema;
