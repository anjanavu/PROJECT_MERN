import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosintercepter';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../Dashboard.css';

const Detail = ({ batchName }) => {
  const [batchDetails, setBatchDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3033/exam/${batchName}`);
        console.log('Fetched Data:', response.data);
        setBatchDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
  
    fetchDetails();
  }, [batchName]);
  
  return (
    <main className='main-container'>
      <div>
        <TableContainer component={Paper} sx={{ width: '90%', margin: '5%' }}>
          <Table className="table-style" sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">DOB</TableCell>
                <TableCell align="center">Exit Test</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {batchDetails.map((student) => (
  <TableRow key={student._id}>
    <TableCell align='center'>{student.name}</TableCell>
    <TableCell align='center'>{student.email}</TableCell>
    <TableCell align='center'>{student.phone}</TableCell>
    <TableCell align='center'>{new Date(student.dob).toLocaleDateString()}</TableCell>
    <TableCell align='center'>{student.exitTestConfirmation ? 'Yes' : 'No'}</TableCell>
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
