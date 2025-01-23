import { Schema } from "mongoose";

const RoomSchema = Schema(
    {
        hotelId: {
            type: Schema.Types.ObjectId,
            ref: "Hotel",
            required: true,
        },
        type: { type: String, required: true, enum: ["Single", "Double", "Suite"] },
        price: { type: Number, required: true, min: 0 },
        maxGuests: { type: Number, required: true, min: 1 },
        availability: { type: Boolean, default: true },
        roomImages: [String],
    },
    { timestamps: true }
);

export default RoomSchema;
