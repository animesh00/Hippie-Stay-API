import { Booking } from '../model/model.js';

export const processPayment = async (req, res) => {
    const { bookingId } = req.body
    const { paymentMethod, paymentAmount } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const paymentDetails = {
            method: paymentMethod,
            amount: paymentAmount,
            status: 'Paid',
        };

        booking.status = 'CheckedOut';
        await booking.save();

        res.status(200).json({ message: 'Payment processed successfully', paymentDetails });
    } catch (error) {
        res.status(500).json({ message: 'Payment processing failed', error });
    }
};
