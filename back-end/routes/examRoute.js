const express = require('express');
const router = express.Router();
const studentData = require('../model/studentModels')
const batchData = require('../model/batchModel')
const nodemailer = require('nodemailer');
const { verifyToken } = require('../lib/auth');
const examData=require('../model/exitExamsModel')
require('dotenv').config();

router.get('/student',verifyToken, async (req, res) => {
    try {
      const data = await studentData.find();
       res.json(data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      res.status(404).json(error);
    }
});

router.get('/batch', verifyToken, async (req, res) => {
  try {
    const data = await batchData.find();
    res.json(data);
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    res.status(404).json(error);
  }
});

router.get('/batch/:batchId',verifyToken, async (req, res) => {
  try {
    const { batchId } = req.params;
    
    // Fetch students from the sample collection with the specified batchId
    const students = await examData.find({ batchId }).populate('studentId', ['name', 'email', 'exitTestConfirmation', 'status']);

    res.json(students);
  } catch (error) {
    console.error("Error occurred while fetching students:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/send-email/:batchId', verifyToken, async (req, res) => {
  try {
    const { batchId } = req.params;
    const { resultLink } = req.body;

    // Fetch students from the sample collection with the specified batchId
    const students = await examData
      .find({ batchId })
      .populate('studentId', ['name', 'email', 'exitTestConfirmation', 'status']);

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send emails to each student
    for (const student of students) {
      // Check if the student has provided an email and has confirmed the exit test
      if (student.studentId.email && student.studentId.exitTestConfirmation) {
        const mailOptions = {
          from:process.env.EMAIL_USER ,
          to: student.studentId.email,
          subject: 'Exam Results',
          text: `Dear ${student.studentId.name},\n\nThe exam results are out! You can check them at: ${resultLink}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
      }
    }

    res.send( 'Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;