import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    completed: { type: Boolean, required: true },
    completedDate: Date,
    dueDate: Date,
    isPrioritized: Boolean,
    labels: [{ type: String }],
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
