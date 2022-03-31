
import asyncHandler from "express-async-handler";
import taskModel from './../model/tasksModel.js';
import userModel from './../model/userModel.js';

// @desc - Get all tasks
// @route - GET /api/tasks
// @access - private
export const getTask = asyncHandler(async (req, res) => {
  const tasks = await taskModel.find({user: req.user.id});
  res.status(200).json(tasks);
});

//
export const setTask = asyncHandler(async (req, res) => {
    if (!req.body.text) {
     res.status(400).json({
         success: false,
            message: "text is required"
        });
    }
const task = await taskModel.create({
    text: req.body.text,
    user: req.user.id
});
res.status(200).json(task);
});


export const updateTask = asyncHandler(async (req, res) => {
    const task = await taskModel.findByIdAndUpdate(req.params.id);
    if (!task) {
        res.status(404).json({
            success: false,
            message: "task not found"
        });
    }
    // const user = await userModel.findById(req.user.id);
    if (!req.user) {
        res.status(404).json({
            success: false,
            message: "user not found"
        });
    }
    if (task.user.toString() !== req.user.id.toString()) {
        res.status(401).json({
            success: false,
            message: "not authorized"
        });
    }
    const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
  res.status(200).json(updatedTask);
});

export const deleteTask = asyncHandler(async (req, res) => {
    const task = await taskModel.findById(req.params.id);
    if (!task) {
        res.status(404).json({
            success: false,
            message: "task not found"
        });
    }

    //  const user = await userModel.findById(req.user.id);
     if (!req.user) {
       res.status(404).json({
         success: false,
         message: "user not found",
       });
     }
     if (task.user.toString() !== req.user.id.toString()) {
       res.status(401).json({
         success: false,
         message: "not authorized",
       });
     }

    await task && task.remove();
    res.status(200).json({ id: req.params.id });
});
