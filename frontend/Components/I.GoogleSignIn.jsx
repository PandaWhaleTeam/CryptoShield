import React from 'react';
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import googleLogo from '/public/google.png';



const supabase = createClient('https://ptdcusrimsowtumozeln.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZGN1c3JpbXNvd3R1bW96ZWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3ODY1ODIsImV4cCI6MjAzNzM2MjU4Mn0.c00NECLec-LoF5CiH38bBKARXHoBoFfG_2MDuOrkKUE')



const GoogleSignIn = () => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      //redirectTo: '/HomePage'
    })

    if (error) {
      console.error('Error: ', error)
    } else {
      setIsAuthenticated(true)
      
    }

    if (isAuthenticated){
      navigate('/HomePage')
    }
  }
  return (
    <button onClick={handleSignIn} style={{
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
      transition: 'background-color 0.3s ease'
  }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#357ae8'}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4285F4'}



  ><img src={googleLogo}
  style={{
    width: '24px',
    height: '24px',

    marginRight: '10px',
  }}
/>
  Sign in with Google</button>




  )

}
export default GoogleSignIn;
