import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosintercepter'
import '../Css/Style.css'
import '../Css/Dashboard.css'
import { RingLoader } from 'react-spinners';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const Student = () => {
    const [loading, setLoading] = useState(true);
    const [studentData,setData]=useState([]);
    useEffect(() => {
      axiosInstance.get('http://localhost:3033/exam/student')
        .then((res) => {
          setData(res.data); 
          setLoading(false); 
          console.log(res.data);
        })

    }, []); 

  return (
    <main className='main-container'>
    <div>
    {loading ? (
         <div className="spinner-container">
         <RingLoader color={'#123abc'} loading={loading} size={50} />
       </div>
     ) : (
    <TableContainer component={Paper} sx={{ width: '90%', margin: '5%' }}>
 <Table  className="table-style" sx={{ minWidth: 1000 }} aria-label="simple table">
   <TableHead className="table-head"sx={{ backgroundColor: '#A9A9A9', color: 'white' }}>
     <TableRow>
       <TableCell align='center'sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Name</TableCell>
       <TableCell align="center"sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Email</TableCell>
       {/* <TableCell align="center"sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>phone</TableCell> */}
       <TableCell align="center"sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Status</TableCell>
       <TableCell align="center"sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Exit Test</TableCell>
       {/* <TableCell align="center"sx={{ border: '1px solid #dddddd' , fontWeight: 'bold'}}>Batch</TableCell> */}

     </TableRow>
   </TableHead>
   <TableBody>
     {
     studentData.map((val,i)=>(
       <TableRow key={i}>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.name}</TableCell>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.email}</TableCell>
         {/* <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.phone}</TableCell> */}
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}style={{ color: val.status ? 'black' : 'red' }}>{val.status ? 'Yes' : 'No'}</TableCell>
         <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.exitTestConfirmation ? 'Yes' : 'No'}</TableCell>
         {/* <TableCell align='center'sx={{ border: '1px solid #dddddd' }}>{val.batchId ? val.batchId.batchName : ''}</TableCell> */}
       </TableRow>
     ))
     
     
     }
   </TableBody>
 </Table>
</TableContainer>
 )}
 </div>
 </main>
  )
}

export default Student