import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box
} from '@mui/material';
import axiosInstance from '../axiosintercepter';

const Results = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [resultLink, setResultLink] = useState('');
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

  const handleResultLinkChange = (event) => {
    setResultLink(event.target.value);
  };

  const sendEmails = async () => {
    try {
      setLoading(true);
      // Send a POST request to your backend to trigger email sending
      const response = await axiosInstance.post(`http://localhost:3033/exam/send-email/${selectedBatch}`, {
        resultLink: resultLink,
      });
  
      // Replace console.log with alert
      alert(response.data);
      window.location.reload(false);
    } catch (error) {
      console.error('Error sending emails:', error);
    }
    finally {
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
            id="outlined-basic"
            label="Result Link"
            variant="outlined"
            style={{ marginBottom: '40px', width: '400px' }}
            value={resultLink}
            onChange={handleResultLinkChange}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={sendEmails}
            disabled={loading}

          >
            Send
          </Button>
        </div>
      </Box>
    </main>
  );
};

export default Results;
