import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import SignIn from "../components/SignIn/signIn";

function Authpage() {
  const [isSignIn, setIsSignIn] = useState(true);



  useEffect(() => {
   





  }, [isSignIn]);




  return (
    <div className="prin-container">
      
      <div className='auth-container'>

        <div className='form-container'> <SignIn /></div>
      </div>
    </div>
  );  
}

export default Authpage;