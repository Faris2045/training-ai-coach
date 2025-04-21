
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  currentPage?: string;
}

const Header = ({ currentPage = 'Accueil' }: HeaderProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-espiblue text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">ESPI+</h1>
          <span className="text-lg font-medium">{currentPage}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLogout}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
