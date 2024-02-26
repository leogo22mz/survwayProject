import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import SignUp from "../components/SignUp/signUp";

function Authpage() {
  const [isSignIn, setIsSignIn] = useState(true);


  useEffect(() => {
   





  }, [isSignIn]);




  return (
    <div className="prin-container">
      <div className='auth-container'>

        <SignUp />
      </div>
    </div>
  );  
}

export default Authpage;