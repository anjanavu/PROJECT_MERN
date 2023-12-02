import React, { useState } from 'react'
import '../Css/Login.css'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
  const [user,setUser]=useState();
  const navigate=useNavigate();
  const inputHandler=(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
  }
  function submitForm(e) {
    e.preventDefault();
    axios.post('http://localhost:3033/user/login', user)
      .then((res) => {
        // alert(res.data.message);
        if (res.data.message === 'success') {
          sessionStorage.setItem("userToken", res.data.token);
          if (user.email === 'admin@gmail.com') {
            alert(res.data.message);
            navigate('/dashboard');
          } else {
            navigate('/home');
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert(error.response.data);
        } else {
          console.error('Error during login:', error);
          alert('An error occurred. Please try again later.');
        }
      });
  }
  
  return (
    <div>
       <div className="contact">
      <div className="rightSide">
        <h1> Login</h1>

        <form id="contact-form" >

          <label htmlFor="email">Email</label>
          <input name="email" type="email" onChange={inputHandler}/>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" onChange={inputHandler} />
         <button onClick={submitForm}> Login</button>
        </form>


        
      </div>
    </div>
    </div>
  )
}

export default Login
