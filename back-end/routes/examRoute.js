const express = require('express');
const router = express.Router();
const studentData = require('../model/studentModels')
const batchData = require('../model/batchModel')
const nodemailer = require('nodemailer');
const { verifyToken } = require('../lib/auth');

router.get('/', verifyToken, async (req, res) => {
  try {
    const data = await studentData.find().populate('batchId');
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

router.get('/:batchName', verifyToken, async (req, res) => {
  try {
    const batchName = req.params.batchName;

    // Find the batchData document based on the batchName
    const batch = await batchData.findOne({ batchName });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Find students related to the batch using the batchId
    const data = await studentData.find({ batchId: batch._id });

    console.log('Fetched Data:', data);
    res.json(data);
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.get('/', verifyToken, async (req, res) => {
  try {
    const data = await studentData.find().populate('batchId');
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

router.get('/batch/:batchName', async (req, res) => {
  try {
    const batchName = req.params.batchName;
    const batch = await batchData.findOne({ batchName });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    const data = await studentData.find({ batchId: batch._id });

    console.log('Fetched Data:', data);
    res.json(data);
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/batches', async (req, res) => {
  try {
    const data = await batchData.find();
    res.json(data);
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    res.status(404).json(error);
  }
});

router.post('/send-email/:batchId', async (req, res) => {
  try {
    const { batchId } = req.params;
    const { resultLink } = req.body;

    // Fetch students in the selected batch
    const students = await Student.find({ batchId, status: true });


    // Create a Nodemailer transporter using your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vuanjana2000@gmail.com',
        pass: 'vlhd lyhh uxvc raeu'
      }
    });

    // Send emails to all students in the selected batch
    const emailPromises = students.map((student) => {
      const mailOptions = {
        from: 'vuanjana2000@gmail.com',
        to: student.email,
        subject: 'Result Link',
        text: `Dear ${student.name},\n\nHere is the link to view your results: ${resultLink}\n\nRegards,\nICT ACADEMY`
      };

      return transporter.sendMail(mailOptions);
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;