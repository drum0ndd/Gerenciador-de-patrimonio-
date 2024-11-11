import React from 'react';
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  message,
} from 'antd';

const Login = () => {
    const onFinish = async (values) => {
        try {
          const response = await fetch('https://seu-servidor.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });
          const data = await response.json();
          if (data.success) {
            message.success('Login realizado com sucesso!');
            // Redirecionar o usuário ou armazenar o token de autenticação
          } else {
            message.error('Nome de usuário ou senha incorretos.');
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          message.error('Ocorreu um erro. Por favor, tente novamente mais tarde.');
        }
      };
      

  const onFinishFailed = (errorInfo) => {
    console.log('Erro:', errorInfo);
    message.error('Erro ao fazer login. Por favor, verifique suas credenciais.');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Login" style={{ width: 300 }}>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
          >
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nome de usuário" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
