import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Survey.css';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Sesión cerrada exitosamente');
    navigate('/');
    window.location.reload();
  };
  

const onFinish = async (values: any) => {
  setLoading(true);
  try {
    const response = await axios.post('http://localhost:3000/login', {
      user: {
        email: values.email,
        password: values.password
      }
    });

    localStorage.setItem('token', response.data.token);

    navigate('/');
    message.success('Inicio de sesión exitoso!');
  } catch (error) {
    console.error('Error de inicio de sesión', error);
    message.error('Error al iniciar sesión');
  }
  setLoading(false);
};


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>
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

      <div className="login-container">
        <h1>Log In</h1><br/>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please, email is needed' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Password needed' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Log In
            </Button>
            Have no account yet? <a href="" onClick={() => navigate('/signup')}>Sign Up now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
