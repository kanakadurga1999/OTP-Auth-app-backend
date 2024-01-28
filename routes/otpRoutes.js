
const express = require('express');
const router = express.Router();
const { generateOTP, verifyOTP } = require('../controllers/otpController');

// Generate and send OTP
router.post('/generateotp', async (req, res) => {
  const { email } = req.body;

  try {
    await generateOTP(email);
    res.status(200).send('OTP sent successfully');
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Verify OTP
router.post('/verifyotp', async (req, res) => {
  const { email, enteredOTP } = req.body;

  try {
    await verifyOTP(email, enteredOTP);
    res.status(200).send('OTP verified successfully');
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(401).send('Invalid OTP');
  }
});

module.exports = router;
