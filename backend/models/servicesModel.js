const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
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
    timings: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timeseries: true,
  }
);

module.exports = mongoose.model("services", servicesSchema);
