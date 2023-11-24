import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosintercepter'
import '../Style.css'
import '../Dashboard.css'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const Student = () => {
    // const navigate=useNavigate();
    const [studentData,setData]=useState([]);
    useEffect(() => {
      axiosInstance.get('http://localhost:3033/exam')
        .then((res) => {
          setData(res.data); 
          console.log(res.data);
        })

    }, []); 

  return (
    <main className='main-container'>
    <div>
    <TableContainer component={Paper} sx={{ width: '90%', margin: '5%' }}>
 <Table  className="table-style" sx={{ minWidth: 1000 }} aria-label="simple table">
   <TableHead className="table-head">
     <TableRow>
       <TableCell align='center'>Name</TableCell>
       <TableCell align="center">Email</TableCell>
       <TableCell align="center">phone</TableCell>
       <TableCell align="center">dob</TableCell>
       <TableCell align="center">Exit Test</TableCell>
       <TableCell align="center">Batch</TableCell>

     </TableRow>
   </TableHead>
   <TableBody>
     {
     studentData.map((val,i)=>(
       <TableRow key={i}>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.name}</TableCell>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.email}</TableCell>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.phone}</TableCell>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{new Date(val.dob).toLocaleDateString('en-GB')}</TableCell>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.exitTestConfirmation.toString()}</TableCell>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.batchId ? val.batchId.batchName : ''}</TableCell>
       </TableRow>
     ))
     
     
     }
   </TableBody>
 </Table>
</TableContainer>
 </div>
 </main>
  )
}

export default Student
