// src/components/Login/LoginComponent.js

import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate(); // Hook do React Router para redirecionamento

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    // Validação básica
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Chamada ao serviço de autenticação
      const response = await login(email, senha);
      // Supondo que a API retorne um token e dados do usuário
      if (response.token) {
        // Armazenar o token no localStorage (ou outro armazenamento seguro)
        localStorage.setItem('token', response.token);
        // Redirecionar para o dashboard ou página inicial
        navigate('/dashboard');
      } else {
        setErro('E-mail ou senha incorretos.');
      }
    } catch (error) {
      // Tratamento de erros da API
      if (error.response && error.response.data) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Entrar</h2>
      {erro && <p className="error-message">{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="additional-options">
        <a href="/esqueci-senha">Esqueci minha senha</a>
        <span> | </span>
        <a href="/registro">Criar nova conta</a>
      </div>
    </div>
  );
};

export default LoginComponent;
