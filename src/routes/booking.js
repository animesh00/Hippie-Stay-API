// bookingbookingRouter.js
import { Router } from 'express';

import { createBooking, getAllBookings, getBookingById, getUserBookings, updateBookingStatus } from '../controllers/booking.js';
import { adminGuard, authGuard } from '../middlewares/authGaurd.js';

const bookingRouter = Router();

// User Routes
bookingRouter.post('/', authGuard, createBooking);
bookingRouter.get('/', authGuard, getUserBookings);

// Admin Routes
bookingRouter.get('/admin', authGuard, adminGuard, getAllBookings);
bookingRouter.put('/admin/:id', authGuard, adminGuard, updateBookingStatus);

bookingRouter.get('/:id', authGuard, getBookingById);


export default bookingRouter;
