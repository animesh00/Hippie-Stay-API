import { Schema } from "mongoose";

const HotelSchema = Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        hotelImage: { type: String, required: true },
        description: { type: String, required: true },
        priceRange: { type: String, required: true },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    },
    { timestamps: true }
);

export default HotelSchema;
