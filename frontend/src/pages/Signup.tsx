import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Survey.css';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        user: {
          email: values.email,
          password: values.password
        }
      });


      localStorage.setItem('token', response.data.token);
      message.success('Registro exitoso!');
      navigate('/');
    } catch (error) {
      console.error('Error en el registro', error);
      message.error('Error al registrarse');
    }
    setLoading(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    message.success('Sesión cerrada exitosamente');
    navigate('/');
  };
  return (
    <div className={`register-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="topbar">
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>
      <div className="sidebar">
        <ul className="sidebar-menu">
        <br/><br/>
          <li className="menu-item" onClick={() => navigate('/')}>Home</li>
          <li className="menu-item" onClick={() => navigate('/')}>My Surveys</li>
          <li className="menu-item" onClick={() => navigate('/login')}>Log In</li>
          <li className="menu-item" onClick={() => navigate('/signup')}>Sign Up</li>
        </ul>
      </div>
      <div className="login-container">
      <h1>Sign Up</h1><br/>
      <Form
        name="register"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please, introduce your email!' },
            { type: 'email', message: '¡E-mail is not valid!' }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor, introduce tu contraseña!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>

        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            Register
          </Button>
          Already have an account? <a href="" onClick={() => navigate('/login')}>¡Log In now!</a>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}

export default Register;