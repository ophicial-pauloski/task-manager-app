import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: "User"
    },
    text: {
        type: String,
        required: [true, "text is required"]
    },
}, {
    timestamps: true
})

const taskModel = mongoose.model("taskModel", taskSchema);

export default taskModel;