
import { Hotel, Room } from '../model/model.js';


export const createHotel = async (req, res) => {


    const { name, address, description, priceRange, lat, lng } = req.body;
    const hotelImage = `http://localhost:5000/${req.file.filename}`


    try {
        const newHotel = new Hotel({ name, address, description, priceRange, lat, lng, hotelImage });
        await newHotel.save();
        res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate('rooms');
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const getHotelById = async (req, res) => {
    const { id } = req.params;

    try {
        const hotel = await Hotel.findById(id).populate('rooms');
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const updateHotel = async (req, res) => {


    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const deleteHotel = async (req, res) => {


    const { id } = req.params;

    try {
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const addRoomToHotel = async (req, res) => {


    const { hotelId } = req.params;
    const { type, price, maxGuests } = req.body;
    const baseURL = 'http://localhost:5000/';  // Base URL for images
    const imageFilenames = req.files ? req.files.map(file => baseURL + file.filename) : [];
    console.log(imageFilenames); // Logging full URLs for verification

    try {
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const newRoom = new Room({ hotelId, type, price, maxGuests, roomImages: imageFilenames });
        await newRoom.save();

        hotel.rooms.push(newRoom._id);
        await hotel.save();

        res.status(201).json({ message: 'Room added successfully', room: newRoom });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const updateRoom = async (req, res) => {


    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const deleteRoom = async (req, res) => {


    const { id } = req.params;

    try {
        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const getAnalytics = async (req, res) => {


    try {
        const totalUsers = await User.countDocuments();
        const totalHotels = await Hotel.countDocuments();
        const totalRooms = await Room.countDocuments();
        const totalBookings = await Booking.countDocuments();

        const analytics = { totalUsers, totalHotels, totalRooms, totalBookings };
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
