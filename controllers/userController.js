const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userController {
  // For Testing Only
  async getUsers(req, res) {
    console.log('welcome to getUsers controller');
    try {
      const users = await User.find();
      res.json({ users });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  async register(req, res) {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ msg: 'This email already exists.' });
      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      // if everything is ok, create a new user and save to mongoDB
      const newUser = new User({ email, password: passwordHash });
      await newUser.save();
      // 3) if everything is okay,then create tokens for authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const user = await User.findOne(newUser.email).select('-password');
      res.status(201).json({
        accessToken: accessToken,
        _id: newUser._id,
        email: newUser.email,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      // Check if existing user exists
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        return res.status(400).json({ msg: 'User does not exist!' });
      // Password validation
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) return res.status(400).json({ msg: 'Wrong password!' });
      // if everything is okay,then create tokens for authentication
      const accessToken = createAccessToken({ id: existingUser._id });
      res.status(201).json({
        accessToken: accessToken,
        _id: existingUser._id,
        email: existingUser.email,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
};
module.exports = new userController();
