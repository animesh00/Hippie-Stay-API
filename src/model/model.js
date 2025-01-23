import { model } from "mongoose";
import BookingSchema from "../schema/booking.js";
import HotelSchema from '../schema/hotel.js';
import PaymentSchema from "../schema/payment.js";
import ReviewSchema from "../schema/review.js";
import RoomSchema from "../schema/room.js";
import UserSchema from "../schema/user.js";

export const User = model("User", UserSchema);
export const Hotel = model("Hotel", HotelSchema);
export const Booking = model("Booking", BookingSchema);
export const Review = model("Review", ReviewSchema);
export const Payment = model("Payment", PaymentSchema);
export const Room = model("Room", RoomSchema);