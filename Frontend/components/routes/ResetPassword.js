
const updateUser = async (userId, userData) => {
    try {
      // Obtém o token de autenticação do localStorage
      const token = localStorage.getItem('token');
  
      // Chamada PATCH para atualizar usuário
      const response = await fetch(`/users/:id`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
        // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar usuário');
      }
  
      // Retorna os dados do usuário atualizado
      const result = await response.json();
      return result.user;
  
    } catch (error) {
      // Tratamento de erro
      console.error('Erro na atualização:', error);
      throw error;
    }
  };