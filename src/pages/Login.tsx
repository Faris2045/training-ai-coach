
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
      {/* Left side - Background image */}
      <div 
        className="hidden md:flex md:w-2/3 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/70364dfd-076f-42c9-b8ad-66014d08f89d.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Right side - Login form */}
      <div className="w-full md:w-1/3 flex flex-col justify-center p-8">
        <div className="text-right mb-8">
          <img 
            src="/lovable-uploads/1cb3eaaf-f19a-4907-8752-af1dd5e30702.png" 
            alt="Maser Engineering" 
            className="inline-block h-16"
          />
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-medium">Bienvenue,</h2>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Identifiant"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-espiblue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-espiblue"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-espiblue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Se connecter
            </button>
          </div>
        </form>
        
        <div className="border-t border-gray-300 my-6 pt-6">
          <button
            className="w-full bg-espiblue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            onClick={() => navigate('/register')}
          >
            Créer compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
