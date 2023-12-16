import { Alert, Box, Button, Container, Grid, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Admindashboard/Header'
import axiosInstance from '../axiosintercepter';


const Form = () => {

  const [isFormVisible, setFormVisibility] = useState(false);
  const [visible, setVisibility] = useState(false);
  const [batches, setBatches] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [postData, setPostData] = useState({
    phone: '',
    dob: '',
    gender: '',
    batchId: '',
    studentId: ''
  });

  const [phoneFieldState, setFormFieldState] = useState({error: false, text: ""});
  const [dobFieldState, setdobFieldState] = useState({error: false, text: ""});
  useEffect(() => {
    axiosInstance.get('/exam/batch')
      .then((res) => {
        setBatches(res.data);
        console.log(res.data);
      })

  }, []);

  
  useEffect(() => {
    axiosInstance.get('/student/current')
      .then((res) => {
        setCurrentUser(res.data);
        if (res.data.status === true) {
          setFormVisibility(false);
          setVisibility(true);
          return;
        }
        if (res.status === 200) {
          setFormVisibility(true);
        }

        setPostData((prevData) => ({
          ...prevData,
          studentId: res.data._id
        }));
      });
  }, []);  // Add postData to the dependency array


  function handleSubmit(e) {
    e.preventDefault();
    if(phoneFieldState.error || dobFieldState.error){
      return;
    }
    axiosInstance.post('/student/postData', postData)
      .then((res) => {
        alert('successfully registered')
        setFormVisibility(false);
        setVisibility(true);
      })
      .catch((error) => {
        alert('error');
      })
  }

  /* /\d\d\/\d\d\/\d\d\d\d/ */
  const onPhoneNumberChange = (e) => {
    const phone = e.target.value || "";

    if (phone.match(/[0-9]{10}/g)) {
      setFormFieldState({error: false, text: ""});
      setPostData({ ...postData, phone });
    } else {
      setFormFieldState({error: true, text: "Invalid phone number"});
    }
  };
 /* /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/ */
const onDateOfBirth = (e) => {
  const dob = e.target.value || "";

  if(dob.match(/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d/)) {
    setdobFieldState({error: false , text: ""})
    setPostData({ ...postData, dob })
  }else{
    setdobFieldState({error: true , text: "Invalid Date Of Birth"})
  }
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
            <Box component="form" onSubmit={handleSubmit} autoComplete="off"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },

              }}
              style={{ display: isFormVisible ? "block" : "none" }}
            >
              <div>
                <div>
                  <h1 style={{ textAlign: 'center', marginTop: '20px', marginRight: '150px', color: '#282c34' }}>
                    Exam Registration Form
                  </h1>
                </div>
                <TextField disabled label="Name" required value={currentUser.name} ></TextField>
                <TextField label="Phone Number" required onChange={onPhoneNumberChange} 
                  error={phoneFieldState.error} helperText={phoneFieldState.text}>
                </TextField>

                <TextField label="DOB" required placeholder='mm/dd/yyyy' onChange={onDateOfBirth}
                  error={dobFieldState.error} helperText={dobFieldState.text}
                  ></TextField>

                <TextField disabled label="Email" value={currentUser.email} ></TextField>

                <TextField select label="Batch Name" required onChange={(e) => {
                  setPostData({ ...postData, batchId: e.target.value })
                }} value={postData.batchId}>
                  {batches.map((option) => (
                    <MenuItem key={option._id} value={option._id} >
                      {option.batchName}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField select label="Gender" required onChange={(e) => {
                  setPostData({ ...postData, gender: e.target.value })
                }} value={postData.gender}>
                  {["Male", "Female", "Other"].map((name) => (
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
            <h2 style={{ display: visible ? "block" : "none", color: 'green', margin: '150px' }}>You are already registered</h2>
          </Grid>

          <Grid item lg={2}>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Form