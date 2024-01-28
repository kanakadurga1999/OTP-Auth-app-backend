
const OTPModel = require('../model/otpModel');
const nodemailer = require('nodemailer');

const generateOTP = async (email) => {
  // Generate a random OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // Save the OTP to the database
  await OTPModel.create({ email, otp });

  // Send the OTP to the provided email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kanakadurgapulikkal@gmail.com',
      pass: 'gale qihx jjin qdhx',
    },
  });

  const mailOptions = {
    from: 'kanakadurgapulikkal@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
    } else {
      console.log('OTP sent successfully');
    }
  });
};

const verifyOTP = async (email, enteredOTP) => {
  // Find the OTP in the database
  const storedOTP = await OTPModel.findOne({ email });

  if (!storedOTP || storedOTP.otp !== enteredOTP) {
    throw new Error('Invalid OTP');
  }

  // Remove the OTP from the database after successful verification
  await OTPModel.deleteOne({ email });
};

module.exports = {
  generateOTP,
  verifyOTP,
};
