const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone_number: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    age: {
      type: String,
      trim: true,
    },
    email_id: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    profile_pic: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["volunteer"],
      default: "volunteer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("volunteers", volunteerSchema);
