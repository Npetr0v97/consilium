import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    summary: { type: String, required: true, maxlength: 50 },
    description: { type: String, maxlength: 75 },
    completed: { type: Boolean, required: true },
    completedDate: Date,
    dueDate: Date,
    isPrioritized: Boolean,
    labels: {
      type: [String],
      validate: [arrayLimit, "Label array exceeds the limit of 4"],
    },
  },
  { timestamps: true }
);
function arrayLimit(val) {
  return val.length <= 4;
}

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
