import { Alert, Box, Button, Container, Grid, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Admindashboard/Header'
import axiosInstance from '../axiosintercepter';


const Form = () => {

  const [isFormVisible, setFormVisibility] = useState(false);
  const [Visible, setVisibility] = useState(false);


  const [batches, setBatches] = useState([]);
  useEffect(() => {
    axiosInstance.get('http://localhost:3033/exam/batch')
      .then((res) => {
        setBatches(res.data);
        console.log(res.data);
      })

  }, []);

  const[postData , setPostData] = useState({
    phone:'',
    dob:'',
    gender:'',
    batchId:'',
    studentId:'',
    name:'',
    email:''
  });

    const[currentUser , setCurrentUser] = useState([]);
    useEffect(() => {
      axiosInstance.get('http://localhost:3033/student/current')
      .then((res) => {
        setCurrentUser(res.data);
        if(res.data.status === true){
          setFormVisibility(false);
          // alert('you are already registered for the exam');
          setVisibility(true);
          return;
        }
        if(res.status === 200 ) {
          setFormVisibility(true);
        }
       
        setPostData({...postData,
          studentId:res.data._id,
          name:res.data.name,
          email:res.data.email
        });

      })
    },[]);
    
  
    // useEffect(() => {
    //   axiosInstance.post('http://localhost:3033/student/postData', {
        
    //   })
    //   .then((res) => {
    //     setPostData(res.data);
    //   })
    // },[]);

   

    function handleSubmit(e){
      e.preventDefault();
      console.log(postData);
      axiosInstance.post('http://localhost:3033/student/postData',postData)
        .then((res) => {
          alert('successfully registered')
          setFormVisibility(false);
        })
        .catch((error)=> {
          alert('error');
        })
    }
  return (
    <div >
      <Header title='User' />
      <Container maxWidth="lg">
        <br />
        <Alert severity="success">You are eligible for the exam</Alert>

        <Grid container spacing={2} >
          <Grid item lg={2}></Grid>

          <Grid item lg={8} >
            <Box component="form" onSubmit={handleSubmit}  noValidate autoComplete="off"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                
              }}
              style={{ display: isFormVisible ? "block" : "none" }}
              >
              <div>
                  <div>
                      <h1 style={{ textAlign: 'center', marginTop: '20px',  marginRight: '150px',color:'#282c34'}}>
                        Exam Registration Form
                      </h1>
                  </div>
                  <TextField disabled label="Name" value={currentUser.name} ></TextField>
                  <TextField label="Phone Number" onChange={(e) => {
                    setPostData({ ...postData, phone: e.target.value })
                    }}
                    value={postData.phone}>
                  </TextField>

                  <TextField label="DOB" placeholder='mm/dd/yyy'onChange={(e) => {
                    setPostData({ ...postData, dob: e.target.value })
                    }}
                    value={postData.dob}></TextField>

                  <TextField disabled label="Email" value={currentUser.email} ></TextField>

                  <TextField select label="Batch Name" onChange={(e) => {
                    setPostData({ ...postData, batchId: e.target.value })
                    }}>
                    {batches.map((option) => (
                      <MenuItem key={option._id} value={option._id} >
                        {option.batchName}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField select label="Gender" onChange={(e) => {
                    setPostData({ ...postData, gender: e.target.value })
                    }}>
                    {["Male", "Female"].map((name) => (
                      <MenuItem key={name} value={name} >
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>

                <br />
                <br />
                <Button type='submit' variant="outlined" style={{ marginLeft: '30%' }} >Submit</Button>
              </div>
            </Box>
            <h2 style={{ display: Visible ? "block" : "none" ,color:'green', margin:'150px'}}>You are already registered</h2>
          </Grid>

          <Grid item lg={2}>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}

export default Form
