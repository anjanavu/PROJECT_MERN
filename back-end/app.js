const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRoute = require('./routes/userRoute');
app.use('/user', userRoute);


const examRouter = require('./routes/examRoute');
app.use('/exam', examRouter);
const studentRouter = require('./routes/studentRoute');
app.use('/student', studentRouter);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });

const PORT = process.env.PORT || 3033;

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
