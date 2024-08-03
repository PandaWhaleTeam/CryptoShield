import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import GoogleSignIn from './I.GoogleSignIn';
// import HomePage from './B.Homepage';
// import cryptoLogo from '/public/IMG_3495.jpg';
import cryptoLogo from '../../public/CryptoShield-logo.png';
import './loginFrom.css';
import FailAlert from './FailAlert';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://ptdcusrimsowtumozeln.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZGN1c3JpbXNvd3R1bW96ZWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3ODY1ODIsImV4cCI6MjAzNzM2MjU4Mn0.c00NECLec-LoF5CiH38bBKARXHoBoFfG_2MDuOrkKUE')

import styled from 'styled-components';

const BackButton = styled.button`
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  transition: transform 0,3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #24303a;
    transform: scale(1.05);
  }
`;

const Arrow = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
  margin-right: 8px;
`;


const LoginForm = () => {

    const [loginStatus, setLoginStatus] = useState(null)  
    const [loginInput, updateLoginEntered] = useState({
      usernameInput: '',
      passwordInput: '',
    });

    const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

    const handleInputChange = (event) => {
      const { id, value } = event.target;
      console.log(event.target)
      updateLoginEntered({
        ...loginInput,
        [id]: value,
      });
    };

    const navigate = useNavigate();

    //login verification with username and password. Verifies that username and password are a match to a record in database.
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(isGoogleSignIn){
        return;
      }
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInput),
        });
        if (response.ok) {
          // console.log(response)
          console.log('response okay')

          const data = await response.json();
          console.log('Response okay');
          console.log('User ID:', data.userId); 
          console.log('User ID:', data.username); 
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('username', data.username);
   
          navigate('/HomePage'); //change this to ProfilePage once it's created
        } else {
          console.error('Login failed');
          setLoginStatus(false)
        }
      } catch (err) {
        console.error('Error with login fetch:', err);
      }
    };
  //login verification using supabase's signInWithPassword method. Having issues with password verification.   
    // const handleSubmit = async (event) =>{
    //   event.preventDefault();
    //   if(isGoogleSignIn){
    //     return;
    //   }
    //     console.log(loginInput.usernameInput)
    //     console.log(loginInput.passwordInput)    
        
    //     const { data, error } = await supabase.auth.signInWithPassword({
    //       email: `${loginInput.usernameInput}`,
    //       password: `${loginInput.passwordInput}`
       
    //     })

    //     if (error) {
    //       console.error('Error: ', error)
    //       setLoginStatus(false);
    
    //     } else {
    //       setLoginStatus(true);
    //       navigate('/dashboard');
    //     }
    //   }

    let alertMessage = <></>
    if(loginStatus === false){
      alertMessage = (
        <FailAlert />
      )
    }

   
    return (


<Container className="loginFormContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
                <BackButton onClick={() => navigate('/')}>
                <Arrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                 <path d="M15 19l-7-7 7-7" />
                </Arrow>
                Back to Homepage
                </BackButton>

      <Form className="loginBox" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <div className='login-image'>
        <img src={cryptoLogo} alt='CryptoShieldLogo' style={{ width: '100%', maxWidth: '200px', marginBottom: '20px' }} />
        </div>
        <h2 className='signInText'>Sign In</h2>

        <Form.Group controlId="usernameInput" style={{ width: '100%', marginBottom: '15px', display: 'flex', justifyContent: 'center'}}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control className='form-control'placeholder='Username' type="email" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Form.Group>

        <Form.Group controlId="passwordInput" style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control placeholder='Password' type="password" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Form.Group>
        {alertMessage}
        <Button
          className='log-in-button'
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '300px',
            padding: '12px',
            borderRadius: '50px',
            border: '1px solid #ccc',
            backgroundColor: '#007bff',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            textAlign: 'center',
            transition: 'background-color 0.3s ease',
            marginTop: '10px',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Log In
        </Button>
        <GoogleSignIn className='googleButton' type="submit" setIsGoogleSignIn={setIsGoogleSignIn}/>
        <div className="newUserLine" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial', fontSize: '12px', marginTop: '20px' }}>
          <p style={{ margin: '0', fontSize: '14px' }}>New to CryptoShield?</p>
          <a href="#" onClick={() => navigate('/signup')} style={{ marginLeft: '10px', color: '#007bff', fontSize: '14px' }}>
            Create New User
          </a>
        </div>
      </Form>
    </Container>
    );
};







  export default LoginForm;
