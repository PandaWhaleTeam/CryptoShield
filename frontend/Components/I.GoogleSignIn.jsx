import React from 'react';
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';



const supabase = createClient('https://ptdcusrimsowtumozeln.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZGN1c3JpbXNvd3R1bW96ZWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3ODY1ODIsImV4cCI6MjAzNzM2MjU4Mn0.c00NECLec-LoF5CiH38bBKARXHoBoFfG_2MDuOrkKUE')



const GoogleSignIn = () => {
  
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      //redirectTo: navigate('/HomePage')
    })
    
    if (error) {
      console.error('Error: ', error)
    } else {
      
      console.log('logged in suucessfully')
      setIsAuthenticated(true)
      console.log(isAuthenticated)
    }

    // if (isAuthenticated){
    //   navigate('/HomePage')
    // }
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/HomePage');
    }
  }, [isAuthenticated, navigate]);
  return (
    <button onClick={handleSignIn}>Sign in with Google</button>
  )

}
export default GoogleSignIn;