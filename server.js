const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// dot env package
require("dotenv").config();

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const vehicleRouter = require("./routes/vehicleRouter");
const paymentRouter = require("./routes/paymentRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DB = process.env.DATABASE;
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URI || DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

app.use(cors());
app.use("/api", categoryRouter);
app.use("/api", vehicleRouter);
app.use("/api", userRouter);
app.use("/api", paymentRouter);

app.listen(PORT);
