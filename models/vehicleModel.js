const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    category: {
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
    content: {
      type: String,
      required: true,
    },
    description: {
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
