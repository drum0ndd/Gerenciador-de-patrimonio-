import React, { useState } from 'react';
import axios from 'axios'; // Note: You must run 'npm install axios' first
import { AlertCircle, User, BookOpen, Lock, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Login = () => {
  const [userType, setUserType] = useState(1); // Starts as student (1)
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [email, setEmail] = useState('');
  const [recuperacaoEnviada, setRecuperacaoEnviada] = useState(false);
  const [loading, setLoading] = useState(false);

  // Configuração base do Axios
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      // Basic validations
      if (!matricula || !senha) {
        throw new Error('Por favor, preencha todos os campos');
      }

      // API call for login
      const response = await api.post('/login', {
        matricula,
        senha,
        tipo_egresso: userType
      });

      // Successful login
      console.log('Login realizado com sucesso:', response.data);

      // Store authentication token
      localStorage.setItem('token', response.data.token);

      // Redirect based on user type
      if (userType === 1) {
        window.location.href = '/aluno/dashboard';
      } else {
        window.location.href = '/professor/dashboard';
      }

    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErro(error.response.data.message || 'Falha no login. Tente novamente.');
      } else if (error.request) {
        // The request was made but no response was received
        setErro('Sem resposta do servidor. Verifique sua conexão com a internet.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErro(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      if (!email) {
        throw new Error('Por favor, insira seu email');
      }

      // API call for password recovery
      await api.post('/recuperar-senha', {
        email,
        tipo_egresso: userType
      });

      setRecuperacaoEnviada(true);
      setTimeout(() => {
        setRecuperacaoEnviada(false);
        setEmail('');
      }, 3000);

    } catch (error) {
      if (error.response) {
        setErro(error.response.data.message || 'Recuperação de senha falhou');
      } else if (error.request) {
        setErro('Sem resposta do servidor. Verifique sua conexão com a internet.');
      } else {
        setErro(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Sistema Escolar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              className={`p-3 text-center rounded-lg flex items-center justify-center gap-2
                ${userType === 1 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setUserType(1)}
              type="button"
            >
              <BookOpen size={20} />
              Aluno
            </button>
            <button
              className={`p-3 text-center rounded-lg flex items-center justify-center gap-2
                ${userType === 2 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setUserType(2)}
              type="button"
            >
              <User size={20} />
              Professor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Matrícula {userType === 1 ? '(8 dígitos)' : '(6 dígitos)'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value.replace(/\D/g, ''))}
                  className="w-full p-2 border rounded-lg pl-10"
                  placeholder={`Digite sua matrícula de ${userType === 1 ? 'aluno' : 'professor'}`}
                  maxLength={userType === 1 ? 8 : 6}
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Senha</label>
              <div className="relative">
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full p-2 border rounded-lg pl-10"
                  placeholder="Digite sua senha"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {erro && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{erro}</AlertDescription>
              </Alert>
            )}

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full text-sm text-blue-500 hover:text-blue-600 transition text-center"
                >
                  Esqueci minha senha
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Recuperar Senha</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRecuperarSenha} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Email institucional
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-lg pl-10"
                        placeholder="Digite seu email"
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {erro && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{erro}</AlertDescription>
                    </Alert>
                  )}

                  {recuperacaoEnviada ? (
                    <Alert className="bg-green-50 text-green-700 border-green-200">
                      <AlertDescription>
                        Email de recuperação enviado com sucesso!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <button
                      type="submit"
                      className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Enviar email de recuperação'}
                    </button>
                  )}
                </form>
              </DialogContent>
            </Dialog>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;