import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";


//connecting to mongodb
connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

//routes
import { taskRouter } from "./routes/taskRoute.js";
import { userRouter } from "./routes/userRoute.js";

//middleware exports
import { errorHandler } from './middleWares/errorMiddleWare.js';


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
