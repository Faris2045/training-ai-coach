
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { apprenants, centres } from '@/services/mockData';
import { User } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [centreFilter, setCentreFilter] = useState<number | 'all'>('all');
  const [sessionFilter, setSessionFilter] = useState<number | 'all'>('all');

  // Get unique sessions from apprenants
  const uniqueSessions = Array.from(
    new Set(apprenants.map(app => app.id_session))
  ).filter(session => session !== undefined) as number[];

  // Filter apprenants based on search and filters
  const filteredApprenants = apprenants.filter(apprenant => {
    const matchesSearch = 
      searchTerm === '' || 
      apprenant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apprenant.prenom.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCentre = 
      centreFilter === 'all' || 
      apprenant.id_centre === centreFilter;
    
    const matchesSession = 
      sessionFilter === 'all' || 
      apprenant.id_session === sessionFilter;
    
    return matchesSearch && matchesCentre && matchesSession;
  });

  // Navigate to apprenant profile
  const handleApprenantClick = (id: string) => {
    navigate(`/apprenant/${id}`);
  };

  const handleNewApprenant = () => {
    navigate('/apprenant/new');
  };

  const handleImportGroup = () => {
    alert('Fonctionnalité d\'import de groupe à venir');
  };

  const handleImportNotes = () => {
    alert('Fonctionnalité d\'import de notes à venir');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Accueil" />
      
      <main className="container mx-auto p-4">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={handleNewApprenant}
            className="espi-button-primary"
          >
            <User size={20} />
            Nouvel apprenant
          </button>
          
          <button
            onClick={handleImportNotes}
            className="espi-button-primary"
          >
            Nouvelles notes
          </button>
          
          <button
            onClick={handleImportGroup}
            className="espi-button-primary"
          >
            Importer un groupe
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="ml-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Retourner au menu
          </button>
        </div>
        
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="espi-table">
              <thead>
                <tr>
                  <th className="w-1/5">
                    <div className="flex items-center">
                      <span>NOM</span>
                      <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded w-full"
                        placeholder="Rechercher"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </th>
                  <th className="w-1/5">
                    <div className="flex items-center">
                      <span>Prénom</span>
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center">
                      <span>Identifiant</span>
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center">
                      <span>Centre formation</span>
                      <select
                        className="ml-2 px-2 py-1 border rounded w-full"
                        value={centreFilter === 'all' ? 'all' : centreFilter}
                        onChange={(e) => setCentreFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                      >
                        <option value="all">Tous</option>
                        {centres.map(centre => (
                          <option key={centre.id} value={centre.id}>
                            {centre.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center">
                      <span>N°session</span>
                      <select
                        className="ml-2 px-2 py-1 border rounded w-full"
                        value={sessionFilter === 'all' ? 'all' : sessionFilter}
                        onChange={(e) => setSessionFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                      >
                        <option value="all">Toutes</option>
                        {uniqueSessions.map(session => (
                          <option key={session} value={session}>
                            Session {session}
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center">
                      <span>Date entrée formation</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApprenants.map((apprenant, index) => {
                  const centre = centres.find(c => c.id === apprenant.id_centre);
                  return (
                    <tr 
                      key={apprenant.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-alternaterow hover:bg-blue-100 cursor-pointer'}
                      onClick={() => handleApprenantClick(apprenant.id)}
                    >
                      <td className="uppercase">{apprenant.nom}</td>
                      <td>{apprenant.prenom}</td>
                      <td>{apprenant.id}</td>
                      <td>{centre?.nom || 'Non assigné'}</td>
                      <td>Session {apprenant.id_session || 'N/A'}</td>
                      <td>{index === 0 ? '24/02/2025' : index === 1 ? '18/03/2024' : '06/01/2025'}</td>
                    </tr>
                  );
                })}
                {filteredApprenants.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      Aucun apprenant ne correspond à votre recherche
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
