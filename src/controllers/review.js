import { Review } from '../model/model.js';

// Add a Review
export const addReview = async (req, res) => {
    const { rating, comment } = req.body;
    const { hotelId } = req.query
    const existingReview = await Review.findOne({ userId: req.user.id, hotelId });

    if (existingReview) {
        return res.status(400).json({ success: false, message: "You have already reviewed this hotel!" });
    }

    const review = new Review({ userId: req.user.id, hotelId, rating, comment });
    await review.save();

    res.status(201).json({ success: true, data: review });
};

// Get Reviews for a Hotel
export const getReviewsForHotel = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const reviews = await Review.find({ hotelId }).populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
};

// Delete a Review (Admin)
export const deleteReview = async (req, res) => {


    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error });
    }
};
