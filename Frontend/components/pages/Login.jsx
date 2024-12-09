import React, { useState } from 'react';
import { AlertCircle, User, BookOpen, Lock, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LoginPage = () => {
  // State management
  const [loginType, setLoginType] = useState('professor'); // 'professor' or 'student'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Simulated fetch call - replace with actual endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
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

      // Handle successful login
      localStorage.setItem('token', data.token);
      
      // Redirect based on user type
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

  // Forgot password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Simulated fetch call - replace with actual endpoint
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotPasswordEmail
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao redefinir senha');
      }

      alert('Um e-mail de redefinição de senha foi enviado.');
      setForgotPasswordEmail('');
    } catch (err) {
      setError(err.message || 'Erro ao redefinir senha.');
    } finally {
      setIsLoading(false);
    }
  };

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
};

export default LoginPage;