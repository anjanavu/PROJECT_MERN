const express = require('express');
const router = express.Router();
const studentData=require('../model/studentModels')
const batchData=require('../model/batchModel')
const jwt=require('jsonwebtoken')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
function verifytoken(req,res,next){
    try{
      const token=req.headers.token;
      console.log(token);
      if(!token) throw 'Unauthorized';
      let payload=jwt.verify(token,'reactexam');
      if(!payload) throw 'Unauthorized';
      next()
    }
    catch(error){
      console.log(error);
      res.status(401).send('error');
    }
  }

router.get('/',verifytoken, async (req, res) => {
    try {
      const data = await studentData.find().populate('batchId');
       res.json(data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      res.status(404).json(error);
    }
  });
  router.get('/batch',verifytoken, async (req, res) => {
    try {
      const data = await batchData.find();
       res.json(data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      res.status(404).json(error);
    }
  });
  router.get('/:batchName', async (req, res) => {
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
  
  


  module.exports = router;