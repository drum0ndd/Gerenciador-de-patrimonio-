// src/components/Login/validation.js

/**
 * Valida o e-mail inserido pelo usuário.
 * @param {string} email - O e-mail a ser validado.
 * @returns {string} Retorna uma mensagem de erro caso o e-mail seja inválido, caso contrário, retorna uma string vazia.
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'O campo de e-mail é obrigatório.';
    }
    if (!emailRegex.test(email)) {
      return 'Por favor, insira um e-mail válido.';
    }
    return '';
  };
  
  /**
   * Valida a senha inserida pelo usuário.
   * @param {string} password - A senha a ser validada.
   * @returns {string} Retorna uma mensagem de erro caso a senha seja inválida, caso contrário, retorna uma string vazia.
   */
  export const validatePassword = (password) => {
    if (!password) {
      return 'O campo de senha é obrigatório.';
    }
    if (password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    return '';
  };
  
  /**
   * Função para validar todos os campos do formulário de login.
   * @param {object} fields - Um objeto contendo os campos do formulário.
   * @returns {object} Retorna um objeto com mensagens de erro para cada campo inválido.
   */
  export const validateLoginForm = ({ email, password }) => {
    const errors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
  
    if (emailError) {
      errors.email = emailError;
    }
    if (passwordError) {
      errors.password = passwordError;
    }
  
    return errors;
  };
  