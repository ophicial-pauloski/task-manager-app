import express from 'express';
export const userRouter = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userControllers.js";

import { protect } from "./../middleWares/authMiddleware.js";

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', protect, getMe);


