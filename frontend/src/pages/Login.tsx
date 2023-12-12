import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  



    return (
      <div className="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor, introduce tu nombre de usuario!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre de usuario" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, introduce tu contraseña!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recuérdame</Checkbox>
            </Form.Item>
  
            <a className="login-form-forgot" href="">
              ¿Olvidaste tu contraseña?
            </a>
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Iniciar sesión
            </Button>
            O <a href="" onClick={() => navigate('/register')}>¡Regístrate ahora!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
  
  export default Login;