import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, Box, TextField } from '@mui/material';
import axiosInstance from '../axiosintercepter';
import '../Css/Dashboard.css'
const Results = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3033/exam/batch');
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);
  
  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleFileChange = (event) => {
    // Handle the selected CSV file
    const file = event.target.files[0];
    setCsvFile(file);
  };

  const uploadResults = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('csvFile', csvFile);
      await axiosInstance.post(`http://localhost:3033/exam/upload-result/${selectedBatch}`, formData);
      alert('Results uploaded successfully');
      window.location.reload(false);
    } catch (error) {
      console.error('Error uploading results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <main className='main-container'>
    <Box
      sx={{
        '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'black',
        },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '40px', color: 'black' }}>Result</h1>

        <FormControl style={{ marginBottom: '40px', width: '400px' }}>
          <InputLabel id="batch-label">Select Batch</InputLabel>
          <Select
            labelId="batch-label"
            id="batch-select"
            value={selectedBatch}
            onChange={handleBatchChange}
            label="Select Batch"
          >
            {batches.map(batch => (
              <MenuItem key={batch._id} value={batch._id}>{batch.batchName}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="file"
          accept=".csv"
          id="csv-file-input"
          InputLabelProps={{ shrink: true }}
          style={{ marginBottom: '40px', width: '400px' }}
          onChange={handleFileChange}
        />

        <Button
          variant="contained"
         
          style={{ marginTop: '20px', backgroundColor: '#636C75', color: 'white' }}
          onClick={uploadResults}
          disabled={loading || !selectedBatch || !csvFile}
        >
          Upload Result
        </Button>
      </div>
    </Box>
  </main>
  );
};

export default Results;
