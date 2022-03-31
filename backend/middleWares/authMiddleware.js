import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "./../model/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized, no token provided",
    });
  }
});
