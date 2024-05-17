import mongoose, { Schema } from "mongoose";

const labelSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 15 },
    color: { type: String, maxlength: 10 },
  },
  { timestamps: true }
);

const Label = mongoose.models.Label || mongoose.model("Label", labelSchema);

export default Label;
