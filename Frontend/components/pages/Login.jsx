import React, { useState } from 'react';
import { AlertCircle, User, BookOpen, Lock, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert.jsx';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.jsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.jsx";
import EspacoUFSC from '../../../Backend/src/Models/EspacoUFSC.js';

const LoginPage = () => {
  const [loginType, setLoginType] = useState('professor'); // 'professor' or 'student'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          type: loginType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro de login');
      }
      localStorage.setItem('token', data.token);
      
      if (loginType === 'professor') {
        window.location.href = '/professor/dashboard';
      } else {
        window.location.href = '/student/dashboard';
      }
    } catch (err) {
      // Handle login errors
      setError(err.message || 'Erro de login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };


 const validaLoginSala = async (req, res, next) => {
    try {
        const { email, senha, salaId } = req.body;

        // Busca o usuário pelo email
        const updateUser = async (userId, userData) => {
          try {
            // Obtém o token de autenticação do localStorage
            const token = localStorage.getItem('token');
        
            // Chamada PATCH para atualizar usuário
            const response = await fetch(`/users:id`, {
              method: 'GET',
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
        

        if (!usuario) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        }


        const getEspacoUFSCById = async (id) => {
          try {
            const token = localStorage.getItem('token');
        
            const response = await fetch('/:id' , {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
        
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Erro ao buscar Espaço UFSC');
            }
        
            const data = await response.json();
            return data;
        
          } catch (error) {
            console.error('Erro na busca de Espaço UFSC:', error);
            throw error;
          }
        };

        // Validação para professor
        if (usuario.tipo.nome === 'professor') {
            // Verifica se o professor pertence à sala
            if (!sala.professores.includes(User._id)) {
                return res.status(403).send({ 
                    message: "Você não tem permissão para acessar esta sala!" 
                });
            }
        } 
        // Validação para aluno
        else if (usuario.tipo.nome === 'aluno') {
            // Verifica se o aluno está matriculado na sala
            if (!EspacoUFSC.participantes.includes(User.id)) {
                return res.status(403).send({ 
                    message: "Você não está matriculado nesta sala!" 
                });
            }
        }

    
        req.usuario = usuario;
        req.sala = sala;

        next();
    } catch (err) {
        console.error('Erro na validação de login:', err);
        res.status(500).send({ 
            message: "Erro interno do servidor", 
            error: err.message 
        });
    }
};

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
   

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-blue-600 text-white text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12" />
          </div>
          <CardTitle className="text-2xl">UFSC - Área Restrita</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Login Type Toggle */}
          <div className="flex mb-6">
            <button
              onClick={() => setLoginType('professor')}
              className={`w-1/2 py-2 ${loginType === 'professor' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'}`}
            >
              Professor
            </button>
            <button
              onClick={() => setLoginType('student')}
              className={`w-1/2 py-2 ${loginType === 'student' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'}`}
            >
              Aluno
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 p-2 border rounded"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 p-2 border rounded"
              />
            </div>

            {/* Forgot Password Dialog */}
            <Dialog>
              <DialogTrigger className="text-blue-600 hover:underline text-sm">
                Esqueceu sua senha?
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Redefinir Senha</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email"
                      placeholder="Insira seu e-mail"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                      className="w-full pl-10 p-2 border rounded"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Link de Redefinição'}
                  </button>
                </form>
              </DialogContent>
            </Dialog>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}};

export default LoginPage;