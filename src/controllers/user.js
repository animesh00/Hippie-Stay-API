import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { sendVerificationEmail } from '../../utils/verifyemail.js';
import { User } from '../model/model.js';

// Register User


export const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const existingUserByPhone = await User.findOne({ phone });
        if (existingUserByPhone) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = crypto.randomBytes(20).toString('hex'); // Generate a verification token

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            verificationToken // Store the token in the user's document
        });

        await newUser.save();

        console.log(":::::::::::::WE ARE HERE::::::::::::");

        const verificationLink = `https://yourdomain.com/verify-email?token=${verificationToken}`;
        await sendVerificationEmail(email, name, verificationLink);

        console.log(":::::::::::::WE ARE HERE:::::::::::: 22222");


        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    console.log(token)

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong during the verification process', error });
    }
};



// Login User

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user's email is verified
        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email before logging in' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get User Profile by user id and bearer token for users and admin
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

// Update User Profile
export const updateUserProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        // user.email = email || user.email;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};




// // Forget password sent mail through nodemailer
// export const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     console.log(email);

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000);
//         user.resetPasswordOTP = otp;
//         user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

//         await user.save();

//         // Send OTP to user's email through nodemailer
//         var transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: 'nwj.shrestha@gmail.com',
//                 pass: 'kcazmnuxtxeexnrx',
//             },
//         });

//         const mailOptions = {
//             from: "Luxestay@gmail.com",
//             to: email,
//             subject: "Reset Password OTP",
//             text: `Your OTP to reset your password is ${otp}`,
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log("Error sending email:", error);
//             } else {
//                 console.log("Email sent:", info.response);
//             }
//         });

//         res.status(200).json({
//             success: true,
//             message: "OTP sent successfully",
//         });
//     }
//     catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error,
//         });
//     }
// }

// // Reset Password according to the OTP
// export const resetPassword = async (req, res) => {
//     const { email, otp, newPassword } = req.body;

//     try {
//         const user = await User.findOne({
//             email,
//             resetPasswordOTP: otp,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid OTP or OTP expired",
//             });
//         }

//         user.password = await bcrypt.hash(newPassword, 12);
//         user.resetPasswordOTP = null;
//         user.resetPasswordExpires = null;

//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Password reset successfully",
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error,
//         });
//     }
// }
