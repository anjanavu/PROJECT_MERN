import { Alert, Box, Button, Container, Grid, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Admindashboard/Header'
import axiosInstance from '../axiosintercepter';


const Form = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosInstance.get('http://localhost:3033/exam/batch')
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })

  }, []);

  return (
    <div >
      <Header title='User' />
      <Container maxWidth="lg">
        <br />
        <Alert severity="success">You are eligible for the exam</Alert>

        <div>
          <h1 style={{ textAlign: 'center', marginTop: '20px',  marginRight: '150px',color:'#282c34'}}>
            Exam Registration Form
          </h1>
        </div>

        <Grid container spacing={2} >
          <Grid item lg={2}></Grid>

          <Grid item lg={8} >
            <Box component="form" noValidate autoComplete="off"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                
              }}
              >
              <div>
                <TextField  label="Name" />
                <TextField label="Phone Number" />
                <TextField label="DOB" placeholder='mm/dd/yyy'/>
                <TextField label="Email" />

                <TextField select label="Batch Name">
                  {data.map((option) => (
                    <MenuItem key={option.value} >
                      {option.batchName}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField select label="Gender">
                  {["Male", "Female"].map((name) => (
                    <MenuItem key={name} >
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <Button variant="outlined" style={{ marginLeft: '30%' }}>Submit</Button>
              </div>
            </Box>
          </Grid>

          <Grid item lg={2}>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}

export default Form
