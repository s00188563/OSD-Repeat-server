const User = require("../models/userModel");
const Payment = require("../models/paymentModel");

exports.getPayments = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    const payments = await Payment.find();
    res.json(payments.user_id === user._id);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createPayment = async (req, res) => {
  console.log("Welcome to payment controller");
  try {
    console.log(req.params.userID);
    const user = await User.findById(req.params.userID);
    if (!user) return res.status(400).json({ msg: "User does not exist!" });

    const { cart } = req.body;
    const { _id, email } = user;
    console.log(user);

    const newPayment = new Payment({
      user_id: _id,
      email,
      cart,
    });

    await newPayment.save();
    res.json({ msg: "Payment Succes!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
