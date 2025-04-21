
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div
        className="hidden md:flex md:w-2/3 bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/6498e998-bbb1-4bd1-822d-c8c87a2e1818.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        aria-hidden="true"
      />

      {/* Right side - Login form */}
      <div className="w-full md:w-1/3 flex flex-col justify-center p-12 relative">
        <div className="mb-8 flex justify-end">
          <img 
            src="/lovable-uploads/87e35c6d-b6b6-47e6-af29-42001cacc2ef.png" 
            alt="Maser Engineering" 
            className="inline-block h-20"
          />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-normal">Bienvenue,</h2>
        </div>

        {error && (
          <div className="p-2 mb-4 text-xs text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Identifiant"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-espiblue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-espiblue"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-espiblue hover:bg-blue-700 text-white font-medium text-sm py-2 rounded"
            >
              Se connecter
            </button>
          </div>
        </form>
        
        <hr className="my-6 border-gray-300" />

        <div>
          <button
            className="w-full bg-espiblue hover:bg-blue-700 text-white font-medium text-sm py-2 rounded"
            onClick={() => navigate('/register')}
          >
            Créer compte
          </button>
        </div>

        <img 
          src="/lovable-uploads/4bf0a7de-6995-4f54-b685-a2981b9b3470.png" 
          alt="ME Logo Bottom Right" 
          className="absolute bottom-4 right-4 h-12"
        />
      </div>
    </div>
  );
};

export default Login;
