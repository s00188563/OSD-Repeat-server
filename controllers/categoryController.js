const Category = require('../models/categoryModel');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// create, delete, and update categories
exports.createCategory = async (req, res) => {
  try {
    const { category_id, name } = req.body;
    const existingCategory = await Category.findOne({ category_id });
    if (existingCategory)
      return res.status(400).json({ msg: 'This category already exists.' });
    const newCategory = new Category({ category_id, name });
    await newCategory.save();
    res.json('Created a category!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      category_id: req.params.id,
    });
    if (!existingCategory)
      return res.status(400).json({ msg: 'This category does not exists.' });
    await Category.findOneAndDelete({ category_id: req.params.id });
    res.json('Deleted a category!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      category_id: req.params.id,
    });
    if (!existingCategory)
      return res.status(400).json({ msg: 'This category does not exists.' });
    const { name } = req.body;
    await Category.findOneAndUpdate({ category_id: req.params.id }, { name });
    res.json('Updated a category!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
