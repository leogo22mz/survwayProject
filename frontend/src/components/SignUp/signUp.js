import '../../pages/Login.css';
import React, { useState } from 'react';
import { Avatar, Dropdown, Button, Input, Upload, message } from 'antd';
import AuthService from '../../services/AuthService/auth.service';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [newUser, setNewUser] = useState({ newNickname: "", newEmail: "", newPassword: "" });

  const handleChange = info => {
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }
  
    const file = info.file.originFileObj;
    
    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
    }

    setImageUploaded(info.fileList.length > 0);
  };
  

  const changeData = () => {
    setNewUser({
      newNickname: document.getElementById('newNickname').value || "",
      newEmail: document.getElementById('newEmail').value || "",
      newPassword: document.getElementById('newPassword').value || ""
    });
  }

  const submitUser = (credentials) => {
    AuthService.createAccount(credentials, formattedUser())
      .then(res => {
        message.success(res.data.status.message);
      }).catch(err => {
        const mess =  err.response ? err.response.data.status.message : err.message;
        message.error(mess);
      });
  }

  const formattedUser = () => {
    const userData = new FormData();

    userData.append('nickname', newUser.newNickname);
    
    imageUploaded && userData.append('user_image', imageFile);

    return userData;
  }

  const encodeUser = (event) => {
    event.preventDefault();
    let credentials = btoa(`${newUser.newEmail}:${newUser.newPassword}`);
    submitUser(credentials);
  }
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("isMenuOpen:", isMenuOpen);
  };
  
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Sesión cerrada exitosamente');
    navigate('/');
    window.location.reload();
  };
  
  return (
    <>
    
    <div className={`login-container ${isMenuOpen ? 'menu-open' : ''}`}>
    <div className="topbar">
          <div className='avatar'>
            <Avatar src={localStorage.getItem('user_image')} size={64} shape="circle" />
          </div>          
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
        </div>
      <div className="sidebar">
        <ul className="sidebar-menu">
          <br /><br />
          <li className="menu-item" onClick={() => navigate('/')}>Home</li>
          <li className="menu-item" onClick={() => navigate('/')}>My Surveys</li>
          {!isAuthenticated && <li className="menu-item" onClick={() => navigate('/login')}>Log In</li>}
          {!isAuthenticated && <li className="menu-item" onClick={() => navigate('/signup')}>Sign Up</li>}
          {isAuthenticated && <li className="menu-item" onClick={handleLogout}>Log Out</li>}
        </ul>
      </div>
        <form onSubmit={encodeUser} className='login-form'> {/* Reemplaza "form" por "login-form" */}
          <h2>Sign Up</h2>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            maxCount={1}
            onChange={handleChange}
          >
            {imageUploaded ? null : (
              <img alt="" />
            )}
          </Upload><br/><br/>
          <Input id='newNickname' value={newUser.newNickname} onChange={changeData} type="text" placeholder="Pon tu nombre y apellidos" required /><br/><br/>
          <Input id='newEmail' value={newUser.newEmail} onChange={changeData} type="email" placeholder="Escribe aqui tu correo" required /><br/><br/>
          <Input id='newPassword' value={newUser.newPassword} onChange={changeData} minLength="6" type="password" placeholder="Escribe aqui tu contraseña" pattern="^\S.*\S$" required /><br/><br/>
          <Button type="primary" htmlType="submit" className="login-form-button">Enter</Button> {/* Reemplaza el estilo en línea por la clase "login-form-button" */}
        </form>
      </div>
    </>
  );
}

export default SignUp;
