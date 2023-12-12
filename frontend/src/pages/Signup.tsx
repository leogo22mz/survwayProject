import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Login.css';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="register-container">
      <Form
        name="register"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Por favor, introduce tu correo electrónico!' },
            { type: 'email', message: '¡El correo electrónico no es válido!' }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Correo electrónico" />
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
          <Button type="primary" htmlType="submit" className="register-form-button" loading={loading}>
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
