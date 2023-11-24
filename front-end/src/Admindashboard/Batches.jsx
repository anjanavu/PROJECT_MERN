import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosintercepter';
import '../Dashboard.css'
const Batches = ({onSidebarItemClick} ) => {
    const [studentData,setData]=useState([]);
    useEffect(() => {
      axiosInstance.get('http://localhost:3033/exam/batch')
        .then((res) => {
          setData(res.data); 
          console.log(res.data);
        })

    }, []); 

    const handleBatchClick = (batchName) => {
        onSidebarItemClick('detail', { batchName });
      };
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        {studentData.map((student, index) => (
               <div className='card' key={index} onClick={() => handleBatchClick(student.batchName)}>
                 
               <img src={student.image} alt='batch' />
               <div className='card-inner'>
               <div>{student.batchName}
                </div>
                  
               </div>
           </div>
        ))}
      </div>
    </main>
  )
}

export default Batches
