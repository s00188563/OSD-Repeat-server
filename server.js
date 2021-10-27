const express = require('express');
const mongoose = require('mongoose');
// dot env package
require('dotenv').config();

const categoryRouter = require('./routes/categoryRouter');
const vehicleRouter = require('./routes/vehicleRouter');

const app = express();

const DB = process.env.DATABASE;
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URI || DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

app.use('/api', categoryRouter);
app.use('/api', vehicleRouter);

app.listen(PORT);
