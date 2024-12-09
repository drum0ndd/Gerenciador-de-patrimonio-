const aceitarInstituicao = async (alunoData) => {
    try {
      const response = await fetch('/aluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alunoData),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao aceitar a instituição.');
      }
  
      const data = await response.json();
      return data; // Retorna a resposta do servidor
    } catch (error) {
      console.error('Erro na requisição:', error.message);
      throw error; // Repropaga o erro para o chamador lidar
    }
  };
  
  export default aceitarInstituicao;
  