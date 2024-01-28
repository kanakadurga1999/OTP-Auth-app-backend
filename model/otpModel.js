const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

const OTPModel = mongoose.model('OTP', otpSchema);

module.exports = OTPModel;