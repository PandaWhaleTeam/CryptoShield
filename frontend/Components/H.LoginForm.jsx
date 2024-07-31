import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import GoogleSignIn from './I.GoogleSignIn';
// import HomePage from './B.Homepage';
import cryptoLogo from '/public/IMG_3495.jpg';
import './loginFrom.css';
import googleLogo from '/public/google.png';

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
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInput),
        });
        if (response.ok) {
          console.log('response okay')
          navigate('/HomePage'); //change this to ProfilePage once it's created
        } else {
          console.error('Login failed');
          alert('Your username or password is incorrect')
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
/* <Container className="loginFormContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>        <Form className="loginBox" onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', padding: '15px 10px', border:'1px solid white', borderRadius: '5px', backgroundColor: 'white', width: '25%'}}>
  <img src={cryptoLogo} alt='CryptoShieldLogo' style={{ width: '80%', maxWidth: '150px', marginBottom: '20px' }}/>


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

  }; */

<Container className="loginFormContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>

      <Form className="loginBox" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <img src={cryptoLogo} alt='CryptoShieldLogo' style={{ width: '80%', maxWidth: '150px', marginBottom: '20px' }} />

        <h2 className='signInText'>Sign In</h2>

        <Form.Group controlId="usernameInput" style={{ width: '100%', marginBottom: '15px', display: 'flex', justifyContent: 'center'}}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control className='form-control'placeholder='Username' type="text" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Form.Group>

        <Form.Group controlId="passwordInput" style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control placeholder='Password' type="password" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Form.Group>

        <Button
          className='log-in-button'
          variant="primary"
          type="submit"
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
        <GoogleSignIn />
        {/* <hr className='lineBreak' /> */}
        {/* <div className='lineBreakContainer'>
        <hr className='lineBreak'/>
        <span className='lineBreakText'>Or sign in with</span>
        <hr className='lineBreak' /> */}
        {/* </div> */}
        {/* <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', width: '100%' }}> */}
          {/* <button
            className='google-button'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '300px',
              padding: '12px',
              borderRadius: '50px',
              border: '1px solid #ccc',
              backgroundColor: '#FFF',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              textAlign: 'center',
              transition: 'background-color 0.3s ease',
              margin: '0 auto',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFF'}
          >

            Sign in with Google
          </button> */}
        {/* </div> */}

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
