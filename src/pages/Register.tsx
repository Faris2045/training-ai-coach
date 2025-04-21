
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    prenom: '',
    role: 'apprenant'
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      // In a real app, this would make an API call to register the user
      // For demo purposes, we'll just navigate to login page
      alert('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (err) {
      setError('Une erreur est survenue lors de la création du compte');
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

      {/* Right side - Registration form */}
      <div className="w-full md:w-1/3 flex flex-col justify-center p-8">
        <div className="text-right mb-8">
          <img 
            src="/lovable-uploads/1cb3eaaf-f19a-4907-8752-af1dd5e30702.png" 
            alt="Maser Engineering" 
            className="inline-block h-16"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-medium">Créer un compte</h2>
          <p className="text-gray-600">Complétez le formulaire ci-dessous</p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-espiblue"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                id="prenom"
                name="prenom"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-espiblue"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-espiblue"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-espiblue"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="apprenant">Apprenant</option>
              <option value="formateur">Formateur</option>
              <option value="coordinateur">Coordinateur</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-espiblue"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-espiblue"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between mb-6 space-x-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              onClick={() => navigate('/login')}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-espiblue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
