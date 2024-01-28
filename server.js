require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const otpRoutes = require('./routes/otpRoutes');


const PORT = process.env.PORT 


app.use(cors({
    origin: ['http://localhost:3000',''],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}))

// Connect to MongoDB
connectDB();


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(bodyParser.json());


// Use OTP routes
app.use('/api/otp', otpRoutes);

// Error handler
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
