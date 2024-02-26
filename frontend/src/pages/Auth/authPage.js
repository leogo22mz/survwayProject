import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import './auth.css';
import SignUp from "../../components/SignUp/signUp";
import SignIn from "../../components/SignIn/signIn";

function Authpage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(prevState => !prevState);
  };

  useEffect(() => {
   





  }, [isSignIn]);




  return (
    <div className="prin-container">
      <div className='auth-container'>
        <div className='back-container'>
          <div className='changeButton'>
          </div>
          
        </div>
        <div className='form-container'> <SignIn /></div>
      </div>
    </div>
  );  
}

export default Authpage;