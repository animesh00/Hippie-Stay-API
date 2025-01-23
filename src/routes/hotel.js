import { Router } from "express";
import upload from "../../utils/upload.js";
import { addRoomToHotel, createHotel, deleteHotel, deleteRoom, getAllHotels, getAnalytics, getHotelById, updateHotel, updateRoom } from "../controllers/hotel.js";
import { adminGuard, authGuard } from "../middlewares/authGaurd.js";


const hotelRouter = Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.get("/:id", getHotelById);

hotelRouter.post("/", authGuard, adminGuard, upload.single("file"), createHotel);
hotelRouter.put("/:id", authGuard, adminGuard, updateHotel);
hotelRouter.delete("/:id", authGuard, adminGuard, deleteHotel);
hotelRouter.post("/:hotelId/rooms", authGuard, adminGuard, upload.array('files', 5), addRoomToHotel);

hotelRouter.put("/rooms/:id", authGuard, adminGuard, updateRoom);
hotelRouter.delete("/rooms/:id", authGuard, adminGuard, deleteRoom);

hotelRouter.get("/analytics", authGuard, adminGuard, getAnalytics);

export default hotelRouter;
