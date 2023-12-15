import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosintercepter';
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import '../Css/Dashboard.css';
import { useParams } from 'react-router-dom';  
const columnStyle = { border: '1px solid #dddddd', textAlign: "center" };
const headerColumnStyle = { ...columnStyle, fontWeight: 'bold' };

const Detail = () => {
  // Use the useParams hook to get the parameters from the route
  const { _id } = useParams();
  const [batchDetails, setBatchDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/exam/batch/${_id}`, {
          headers: {
            Accept: 'application/json'
          }
        });
        console.log('Batch Details API response:', response.data);
        setBatchDetails(response.data);
      } catch (error) {
        console.error("Error occurred while fetching batch details:", error);
        // Handle error, e.g., display an error message to the user.
      }
    };

    fetchData();
  }, [_id]);

  console.log('Batch Details:', batchDetails);

  async function downloadCSV() {
    const response = await axiosInstance.get(`/exam/batch/${_id}`, {
      responseType: 'blob',
      headers: {
        Accept: 'text/csv'
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${_id}.csv`);

    link.click();
  }
  const sendEmails = async () => {
    try {
      // Assuming you have an API endpoint for sending emails
      const response = await axiosInstance.post('/exam/send-emails', {
        batchDetails, // You can pass the batchDetails to the server for processing
      });
      alert('Email sent successfully');
      window.location.reload(false);
      console.log('Emails sent successfully:', response.data);
      // Add any UI feedback if needed
    } catch (error) {
      console.error('Error sending emails:', error);
      // Handle error, e.g., display an error message to the user.
    }
  };
  return (
    <main className='main-container'>
      <div>
        <Typography sx={{ margin: '3%' }} variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
          Batch Details
        </Typography>
        <Fab
          style={{ float: "right", margin: "0 5% 16px 0", backgroundColor: '#636C75', color: 'white', textTransform: 'none' }}
          variant="extended"
          size="small"
          aria-label="add"
          onClick={sendEmails}
        >
          <SendIcon style={{ marginLeft: '8px' }} /> Send Result
        </Fab>
        <Fab
          style={{ float: "right", margin: "0 5% 16px 0", backgroundColor: '#636C75', color: 'white', textTransform: 'none' }}
          variant="extended"
          size="small"
          aria-label="add"
          onClick={downloadCSV}
        >
          <DownloadIcon /> Download csv
        </Fab>
        <TableContainer component={Paper} sx={{ width: '90%', margin: '5%' }}>
          <Table className="table-style" sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell sx={headerColumnStyle}>Student Name</TableCell>
                <TableCell sx={headerColumnStyle}>Email</TableCell>
                <TableCell sx={headerColumnStyle}>Register Status</TableCell>
                <TableCell sx={headerColumnStyle}>Result</TableCell>
                {/* Add more columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {batchDetails.map((student, index) => (
                <TableRow key={index}>
                  <TableCell sx={columnStyle}>{student.studentId.name}</TableCell>
                  <TableCell sx={columnStyle}>{student.studentId.email}</TableCell>
                  <TableCell sx={columnStyle} style={{ color:student.studentId.status ? 'black' : 'red' }}>{student.studentId.status ? 'Yes' : 'No'}</TableCell>
                  <TableCell sx={columnStyle}>{student.result || "-"}</TableCell>
                  {/* Add more cells based on the structure of your data */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </div>
    </main>
  );
};

export default Detail;