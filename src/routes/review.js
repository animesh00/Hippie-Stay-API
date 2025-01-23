import { Router } from "express";
import { adminGuard, authGuard } from "../middlewares/authGaurd.js";
import { addReview, deleteReview, getReviewsForHotel } from "../controllers/review.js";



const reviewRouter = Router();

reviewRouter.post('/', authGuard, addReview);
reviewRouter.get('/hotel/:hotelId', getReviewsForHotel);
reviewRouter.delete('/admin/:id', authGuard, adminGuard, deleteReview);

export default reviewRouter;
