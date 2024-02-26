import '../../pages/Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Button, Input, message } from 'antd';
import AuthService from '../../services/AuthService/auth.service';

function SignIn() {
  const nav = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const userImage = localStorage.getItem('user_image');

  const changeData = () => {
    setUser({
      email: document.getElementById('email').value || "",
      password: document.getElementById('password').value || ""
    });
  }

  const loadPage = (cond) => {
    if (cond) {
      nav('/');
    } else {
      nav('/');
    };
  }

  const submitUser = (credentials) => {
    AuthService.loginUser(credentials)
      .then(res => {
        res.user_image && localStorage.setItem('user_image', res.user_image.url);
        console.log('email: ' + res.user_description.email);
        localStorage.setItem('email', res.user_description.email);
        loadPage(res.user_description.is_admin);
      })
      .catch(err => {
        const mess = err.response ? err.response.data.status.message : err.message;
        message.error(mess)
      });
  }

  const encodeUser = (event) => {
    event.preventDefault();
    let credentials = btoa(`${user.email}:${user.password}`);

    submitUser(credentials)
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <form onSubmit={encodeUser} className='login-form'>
          <h2>Log In</h2>
          <Input id='email' onChange={changeData} value={user.email} type="email" placeholder="Escribe aqui tu correo" required /><br /><br />
          <Input id='password' onChange={changeData} value={user.password} minLength="6" type="password" placeholder="Escribe aqui tu contraseña" pattern="^\S.*\S$" required /><br /><br />
          <Button type="primary" htmlType="submit" className="login-form-button">Enter</Button> 
        </form>
      </div>
    </>
  );
}

export default SignIn;
