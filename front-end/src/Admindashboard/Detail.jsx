import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosintercepter';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import '../Dashboard.css';

const Detail = ({ batchName }) => {
  const [batchDetails, setBatchDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3033/exam/batch/${batchName}`);
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
      <div >
      <Typography sx={{margin:'3%'}}variant="h4" gutterBottom style={{ textAlign: 'center',fontWeight:'bold',color:'black' }}>
           {batchName}
        </Typography>
        <TableContainer component={Paper} sx={{ width: '90%', margin: '5%' }}>
          <Table className="table-style" sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell align='center'sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center"sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell align="center"sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell align="center"sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="center"sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Exit Test</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {batchDetails.map((student) => (
  <TableRow key={student._id}>
    <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{student.name}</TableCell>
    <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{student.email}</TableCell>
    <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{student.phone}</TableCell>
    <TableCell align='center'sx={{ border: '1px solid #dddddd' }}style={{ color: student.status ? 'black' : 'red' }}>{student.status ? 'Yes' : 'No'}</TableCell>
    <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{student.exitTestConfirmation ? 'Yes' : 'No'}</TableCell>
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
