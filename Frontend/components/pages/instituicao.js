import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Building2, 
  MapPin
} from 'lucide-react';

const UFSCPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        // Redireciona para página de login se não houver token
        window.location.href = '/login';
        return;
      }

      try {
        // Endpoint para verificar token
        const response = await axios.get('http://localhost:3000/api/verificar-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.valido) {
          setIsAuthenticated(true);
        } else {
          // Token inválido, redireciona para login
          localStorage.removeItem('userToken');
          window.location.href = '/login';
        }
      } catch (error) {
        // Erro na verificação, redireciona para login
        localStorage.removeItem('userToken');
        window.location.href = '/login';
      }
    };

    verificarAutenticacao();
  }, []);

  // Se não estiver autenticado, não renderiza nada
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">UFSC - Área Institucional</h1>
        </div>
      </header>

      <main className="p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 bg-blue-600 text-white">
              <h1 className="text-3xl font-bold">Universidade Federal de Santa Catarina</h1>
              <p className="mt-2 text-blue-100">Conhecimento, Inovação e Transformação Social</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="text-blue-600 mt-1" />
                <div>
                  <h2 className="font-semibold text-lg">Localização</h2>
                  <p>Campus Universitário Reitor João David Ferreira Lima, Trindade, Florianópolis - SC</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Building2 className="text-blue-600 mt-1" />
                <div>
                  <h2 className="font-semibold text-lg">Sobre a UFSC</h2>
                  <p>Fundada em 1960, a UFSC é uma instituição pública federal de ensino superior, reconhecida nacionalmente pela excelência em ensino, pesquisa e extensão.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UFSCPage;