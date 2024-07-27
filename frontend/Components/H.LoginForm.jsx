import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import GoogleSignIn from './I.GoogleSignIn';
import HomePage from './B.Homepage';

const LoginForm = () => {
    const [loginInput, updateLoginEntered] = useState({
      usernameInput: '',
      passwordInput: '',
    });
  
    const handleInputChange = (event) => {
      const { id, value } = event.target;
      console.log(event.target)
      updateLoginEntered({
        ...loginInput,
        [id]: value,
      });
    };
  
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInput),
        });
        if (response.ok) {
          console.log('response okay')
          navigate('/HomePage');
        } else {
          console.error('Login failed');
        }
      } catch (err) {
        console.error('Error with login fetch:', err);
      }
    };

    // const handleGoogleSignInSuccess = () => {
    //   console.log('google sign in successful');
    //   navigate('/HomePage')
    // }
  
  
    return (
      <Container className="loginFormContainer" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', border: '1px solid orange'}}>
        <Form className="loginBox" onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', padding: '15px 10px', border:'1px solid white', borderRadius: '5px', backgroundColor: 'white', width: '25%'}}>
          <img src={'/public/resource/CryptoShieldLogo.png'} alt='CryptoShieldLogo'/>
     
          <Form.Group
            className="usernameInput"
            controlId="usernameInput"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              paddingTop: '20px',
            }}
          >
            <Form.Label
              style={{ fontFamily: 'arial', color: 'grey', fontSize: '12px' }}
            >
              Username
            </Form.Label>
            <Form.Control type="text" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group
            className="passwordInput"
            controlId="passwordInput"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Form.Label
              style={{ fontFamily: 'arial', color: 'grey', fontSize: '12px', paddingTop: '10px' }}
            >
              Password
            </Form.Label>
            <Form.Control type="password" onChange={handleInputChange} />
          </Form.Group>
          <div style={{paddingTop: '20px', display: 'flex', justifyContent: 'space-around'}}>
            <Button
              className="loginButton"
              variant="login"
              type="submit"
              style={{ border: '1px solid black', marginRight: '20px'}}
            >
            Log In
            </Button>
            <GoogleSignIn />
          </div>
          <div
            className="newUserLine"
            style={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Arial',
              fontSize: '10px',
              marginTop: '40px',
            }}
          >
            <p style={{ margin: '0' , fontSize: "12px"}}>New to CryptoShield?</p>
            <a href="#" onClick={()=>navigate('/signup')} style={{ marginLeft: '20px' , color: 'darkblue', fontSize: "12px"}}>
              Create New User
            </a>
          </div>
        </Form>
      </Container>
    );
  };
  
  const test = 'just a test'

  export default LoginForm;
  