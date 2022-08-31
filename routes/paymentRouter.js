const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");

router
  .route("/:userID/payment")
  .get(paymentController.getPayments)
  .post(paymentController.createPayment);

module.exports = router;
