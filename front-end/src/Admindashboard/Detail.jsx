import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosintercepter';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import '../Css/Dashboard.css';
const Detail = ({ _id }) => {
  const [batchDetails, setBatchDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3033/exam/batch/${_id}`);
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

  return (
    <main className='main-container'>
      <div>
        <Typography sx={{ margin: '3%' }} variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
          Batch Details
        </Typography>
        <TableContainer component={Paper} sx={{ width: '90%', margin: '5%' }}>
          <Table className="table-style" sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell align='center' sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Student Name</TableCell>
                <TableCell align="center" sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Emailr</TableCell>
                <TableCell align="center" sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Eligible for Test</TableCell>
                <TableCell align="center" sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Register Status </TableCell>
                {/* Add more columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {batchDetails.map((student, index) => (
                <TableRow key={index}>
                  <TableCell align='center' sx={{ border: '1px solid #dddddd' }}>{student.studentId.name}</TableCell>
                  <TableCell align='center' sx={{ border: '1px solid #dddddd' }}>{student.studentId.email}</TableCell>
                  <TableCell align='center' sx={{ border: '1px solid #dddddd' }}style={{ color:student.studentId.exitTestConfirmation ? 'black' : 'red' }}>{student.studentId.exitTestConfirmation ? 'Yes' : 'No'}</TableCell>
                  <TableCell align='center' sx={{ border: '1px solid #dddddd' }}style={{ color:student.studentId.status ? 'black' : 'red' }}>{student.studentId.status ? 'Yes' : 'No'}</TableCell>
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