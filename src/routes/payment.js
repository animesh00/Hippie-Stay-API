import { Router } from "express";
import { authGuard } from "../middlewares/authGaurd.js";
import { processPayment } from "../controllers/payment.js";


const paymentRouter = Router();

// User Routes
paymentRouter.post('/', authGuard, processPayment);

export default paymentRouter


