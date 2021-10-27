const Vehicle = require('../models/vehicleModel');

// Filtering, Sorting and Pagination
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; // querySting = req.query

    // Deletes words page,sort,limit from filtering section
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Converts queryObj to a string so we can use string handling w/ mongoose filtering
    let queryStr = JSON.stringify(queryObj);
    // adds the character $ to all the fields below
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    );
    // Converts it to JSON for filtering
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      // replaces "," with a blank space
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // "-"means from the most recent
      this.query = this.query.sort('createdAt');
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    // MongoDB pagination
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.getVehicle = async (req, res) => {
  try {
    const features = new APIfeatures(Vehicle.find(), req.query)
      .filtering()
      .sorting()
      .pagination();
    const vehicle = await features.query;
    res.json({
      status: 'success',
      result: vehicle.length,
      vehicle: vehicle,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// only admin can create, delete, and update categories
exports.createVehicle = async (req, res) => {
  try {
    const { vehicle_id, category, title, price, description, images } =
      req.body;
    if (!images) return res.status(400).json({ msg: 'No image upload' });
    const existingVehicle = await Vehicle.findOne({ vehicle_id });
    if (existingVehicle)
      return res.status(400).json({ msg: 'This vehicle already exists.' });
    const newVehicle = new Vehicle({
      vehicle_id,
      category,
      title: title.toLowerCase(),
      price,
      description,
      images,
    });
    await newVehicle.save();
    res.json('Created a vehicle!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json('Deleted a vehicle!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateVehicle = async (req, res) => {
  try {
    const { category, title, price, description, content, images } = req.body;
    await Vehicle.findByIdAndUpdate(
      { _id: req.params.id },
      {
        category,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
      }
    );
    res.json('Updated a vehicle!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};