import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Checkbox, Upload, Avatar } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Survey.css';
import { UploadChangeParam } from 'antd/lib/upload';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Image upload state
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = async (values: { email: any; password: any; username: any; }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        user: {
          email: values.email,
          password: values.password,
          username: values.username,
          profileImage: imageUrl // Send the profile image URL to the backend
        }
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        message.success('Registro exitoso!');
        setIsRegistered(true);
        navigate('/');
      } else {
        message.success('Success!');
      }
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
    setIsRegistered(false);
    message.success('Sesión cerrada exitosamente');
    navigate('/');
    window.location.reload();
  };

const handleImageUpload = (info: UploadChangeParam<any>) => {
  if (info.file.status === 'done' && info.file.response) {
    setImageUrl(info.file.response.imageUrl);
  }
};


  return (
    <div className={`register-container ${isMenuOpen ? 'menu-open' : ''}`}>
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
        <h1>Sign Up</h1><br />
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
            name="username"
            rules={[{ required: true, message: 'Please, introduce your username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Your image upload endpoint
              onChange={handleImageUpload}
            >
              {imageUrl ? (
                <Avatar size={64} src={imageUrl} alt="Avatar" />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
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
