// Importing necessary modules
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDatabase from './src/database/database.js';
import bookingRouter from './src/routes/booking.js';
import hotelRouter from './src/routes/hotel.js';
import paymentRouter from './src/routes/payment.js';
import reviewRouter from './src/routes/review.js';
import userRouter from './src/routes/user.js';

dotenv.config();

connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Create a router for api and add all API routes to this router
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send('API is working fine!');
});

apiRouter.use('/users', userRouter);
apiRouter.use('/hotels', hotelRouter);
// apiRouter.use('/rooms', roomRoutes);
apiRouter.use('/bookings', bookingRouter);
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/payments', paymentRouter);

app.use(express.static("./public"));

// Use the apiRouter with the '/api' prefix
app.use('/api', apiRouter);

// Define port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
