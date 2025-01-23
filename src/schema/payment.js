import { Schema } from "mongoose";

const PaymentSchema = Schema(
    {
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: { type: Number, required: true, min: 0 },
        method: { type: String, required: true },
        status: {
            type: String,
            default: "Paid",
            enum: ["Paid", "Failed", "Pending"],
        },
    },
    { timestamps: true }
);

export default PaymentSchema;
