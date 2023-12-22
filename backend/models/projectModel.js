const mongoose = require("mongoose");

const currentavailSchema = new mongoose.Schema(
  {
    food_type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    servings: {
      type: String,
      required: true,
    },
    timings:{
      type: String,
      required: true,
    },
    date:{
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
     
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("projects", currentavailSchema);
