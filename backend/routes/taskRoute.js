import express from 'express'
export const taskRouter = express.Router();

// Import controllers
import {
  getTask,
  setTask,
  updateTask,
  deleteTask,
} from "./../controllers/taskControllers.js";

import { protect } from "./../middleWares/authMiddleware.js";

taskRouter.get("/", protect, getTask);

taskRouter.post("/", protect, setTask);

taskRouter.put("/:id", protect, updateTask);

taskRouter.delete("/:id", protect, deleteTask);
