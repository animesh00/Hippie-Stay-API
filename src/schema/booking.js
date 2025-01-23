import { Schema } from "mongoose";

const BookingSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        hotelId: {
            type: Schema.Types.ObjectId,
            ref: "Hotel",
            required: true,
        },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        totalPrice: { type: Number, required: true, min: 0 },
        status: {
            type: String,
            default: "Booked",
            enum: ["Booked", "Cancelled", "CheckedOut"],
        },
    },
    { timestamps: true }
);

export default BookingSchema;
