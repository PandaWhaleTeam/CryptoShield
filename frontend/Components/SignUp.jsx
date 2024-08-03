import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import GoogleSignIn from './I.GoogleSignIn';


const SignUp = () => {
    const [signupInput, updatedSignUp] = useState({
        firstNameInput: '',
        lastNameInput: '',
        emailInput: '', 
        usernameInput: '', 
        passwordInput: '',
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        console.log(event.target)
        updatedSignUp({
          ...signupInput,
          [id]: value,
        });
      };

      const navigate = useNavigate();

      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted:', signupInput); // Log form submission data
        try {

          const response = await fetch('/api/signUp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupInput),
          });
    
          if (response.ok) {  
            console.log('response okay')
            const data = await response.json()
            console.log(data)
            navigate('/DashBoard'); //change this to ProfilePage once it's created
          } else {
            console.error('Sign Up Is not rendering');
            //alert('Your username or password is incorrect')
          }
        } catch (err) {
          console.error('Error with login fetch:', err);
        }
      };

      return (
        <Container className="signUpFormContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>

      <Form className="signupbox" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      

        <h2 className='signUpText'>Sign Up</h2>

        <Form.Group controlId="firstNameInput" style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control placeholder='First Name' type="firstNameInput" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Form.Group>

        <Form.Group controlId="lastNameInput" style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control placeholder='Last Name' type="lastNameInput" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Form.Group>


        <Form.Group controlId="usernameInput" style={{ width: '100%', marginBottom: '15px', display: 'flex', justifyContent: 'center'}}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control className='form-control'placeholder='Username' type="text" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Form.Group>

        <Form.Group controlId="passwordInput" style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control placeholder='Password' type="password" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Form.Group>

        <Form.Group controlId="emailInput" style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Form.Label style={{ fontFamily: 'Arial', color: '#333', fontSize: '14px' }}></Form.Label>
          <Form.Control placeholder='email' type="emailInput" onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
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
          Sign Up
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
          <p style={{ margin: '0', fontSize: '14px' }}>Already a User?</p>
          <a href="#" onClick={() => navigate('/login')} style={{ marginLeft: '10px', color: '#007bff', fontSize: '14px' }}>
            Sign In
          </a>
        </div>
      </Form>
    </Container>
    );


      
};



export default SignUp;
