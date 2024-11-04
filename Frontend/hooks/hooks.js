// src/hooks/loginHook.js

import { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../components/Login/validation';

/**
 * Hook personalizado para gerenciar o processo de login.
 * @returns {object} Um objeto contendo estados e funções para o login.
 */
const useLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  /**
   * Manipulador para submissão do formulário de login.
   * @param {Event} event - O evento de submissão do formulário.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');
    setFieldErrors({});

    // Validação dos campos
    const errors = validateLoginForm({ email, password: senha });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      // Chamada ao serviço de autenticação
      const response = await login(email, senha);
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      } else {
        setErro('E-mail ou senha incorretos.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    erro,
    fieldErrors,
    handleSubmit,
  };
};

export default useLogin;
