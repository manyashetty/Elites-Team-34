const mongoose = require("mongoose");

const consumerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    name_organization: {
        type: String,
        trim: true,
      required: true,
    },
    phone_number1: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    phone_number2: {
        type: String,
        trim: true,
        required: true,
        unique: true,
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
    location:{
        type: String,
      trim: true,
      required: true,
    },
    member_count:{
        type : Number ,
        default : 0,
    },
    role: {
      type: String,
      enum: ["supplier"],
      default: "supplier",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("consumers", consumerSchema);
// transport