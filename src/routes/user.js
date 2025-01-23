import { Router } from "express";
import { getUserProfile, loginUser, registerUser, updateUserProfile, verifyEmail } from "../controllers/user.js";
import { authGuard } from "../middlewares/authGaurd.js";


const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/profile", authGuard, getUserProfile);
userRouter.put("/profile/edit", authGuard, updateUserProfile);
// userRouter.post("/forgot-password", forgotPassword);
// userRouter.post("/reset-password", resetPassword);
userRouter.get('/verify-email', verifyEmail);


export default userRouter;
