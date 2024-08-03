import React from 'react';
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import googleLogo from '../../public/google.png';
import './googleSignIn.css';



const supabase = createClient('https://ptdcusrimsowtumozeln.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZGN1c3JpbXNvd3R1bW96ZWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3ODY1ODIsImV4cCI6MjAzNzM2MjU4Mn0.c00NECLec-LoF5CiH38bBKARXHoBoFfG_2MDuOrkKUE')

const GoogleSignIn = ({ setIsGoogleSignIn }) => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleSignIn = async () => {

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        //redirectTo: '/HomePage'
      })
      //console.log('google data: ', data)
      const { data: sessionData, error2 } = await supabase.auth.getSession();
      const user = sessionData.session.user.user_metadata;
      // const { user } = data;
      // const userId = user.id;
      // const userEmail = user.email;
      // const userName = user.user_metadata.full_name;
      console.log(user)
      //setIsAuthenticated(true)

      try {
        const response = await fetch('/api/googlelogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        console.log('response okay')

        const data = await response.json();
        console.log('Response okay');
        console.log('User ID:', data.userId); 
        console.log('User ID:', data.username); 
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);

      }
      catch{}

    }
    catch {
      console.log('Error: ')}





    // if (error) {
      
    // } else {
    //   console.log('google data: ', data)
     
      // try {
      //   const response = await fetch('/api/googlelogin', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(loginInput),
      //   });
      //   if (response.ok) {
      //     // console.log(response)
      //     console.log('response okay')

      //     const data = await response.json();
      //     console.log('Response okay');
      //     console.log('User ID:', data.userId); 
      //     console.log('User ID:', data.username); 
      //     localStorage.setItem('userId', data.userId);
      //     localStorage.setItem('username', data.username);
   
      //     navigate('/HomePage'); //change this to ProfilePage once it's created
      //   } else {
      //     console.error('Login failed');
      //     alert('Your username or password is incorrect')
      //   }
      // } catch (err) {
      //   console.error('Error with login fetch:', err);
      // }

    //}

    // if (isAuthenticated){
    //   navigate('/HomePage')
    // }
  }
  return (
    <button className='google-button' onClick={handleSignIn} style={{
      display: 'block',
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
      marginTop: '20px',
      textAlign: 'center',
      transition: 'background-color 0.3s ease',
      gap: '10px',
      marginBottom: '10px',
  }}

  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFF'}

  ><img src={googleLogo}
  style={{
    width: '20px',
    height: '20px',
    marginLeft: '-15px',
    marginRight: '25px',
    verticalAlign: 'middle',
  }}
/>
  Sign in with Google</button>

  )

}
export default GoogleSignIn;
