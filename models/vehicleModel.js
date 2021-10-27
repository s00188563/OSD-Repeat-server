const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
