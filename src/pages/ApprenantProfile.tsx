
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { 
  apprenants, 
  getProfilPsychotechnique, 
  getSavoirEtre, 
  getSavoirFaireMetier, 
  getSuiviHebdo,
  getParcoursPropose,
  getTravauxPratiques,
  getEvaluationsTheoriques
} from '@/services/mockData';

import { 
  User,
  BarChart3,
  FileText,
  CheckCircle,
  Calendar,
  BookOpen,
  Clipboard,
  RefreshCcw,
  Download,
  Save
} from 'lucide-react';

const ApprenantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('fiche');
  
  // Find the apprenant data
  const apprenant = apprenants.find(a => a.id === id);
  
  // Fetch data based on the selected tab
  const [psychoProfile, setPsychoProfile] = useState(getProfilPsychotechnique(id || ''));
  const [savoirEtre, setSavoirEtre] = useState(getSavoirEtre(id || ''));
  const [savoirFaire, setSavoirFaire] = useState(getSavoirFaireMetier(id || ''));
  const [suiviHebdo, setSuiviHebdo] = useState(getSuiviHebdo(id || ''));
  const [parcours, setParcours] = useState(getParcoursPropose(id || ''));
  const [travauxPratiques, setTravauxPratiques] = useState(getTravauxPratiques(id || ''));
  const [evaluationsTheoriques, setEvaluationsTheoriques] = useState(getEvaluationsTheoriques(id || ''));
  
  // If apprenant not found, redirect to dashboard
  useEffect(() => {
    if (!apprenant && id !== 'new') {
      navigate('/dashboard');
    }
  }, [apprenant, id, navigate]);
  
  // New apprenant form state
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    genre: 'Homme',
    adresse_email: '',
    adresse_postale: '',
    numero_telephone: '',
    numero_session: '',
    centre_formation: '',
    entreprise: ''
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    alert('Profil enregistré avec succès!');
    navigate('/dashboard');
  };
  
  const handleCalculerParcours = () => {
    alert('Parcours calculé avec succès!');
    setActiveTab('parcours');
  };
  
  const handleValiderParcours = () => {
    alert('Parcours validé avec succès!');
  };
  
  // Tab content based on active tab
  const renderTabContent = () => {
    if (!apprenant && id !== 'new') {
      return <div>Chargement...</div>;
    }
    
    switch (activeTab) {
      case 'fiche':
        return id === 'new' ? renderNewApprenantForm() : renderFicheUtilisateur();
      case 'evaluation':
        return renderEvaluationForm();
      case 'parcours':
        return renderParcours();
      case 'suivi':
        return renderSuivi();
      case 'notes':
        return renderNotes();
      case 'dashboard':
        return renderDashboard();
      default:
        return renderFicheUtilisateur();
    }
  };
  
  // New apprenant form
  const renderNewApprenantForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Nouvel apprenant</h2>
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
            Retour
          </button>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom :</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom :</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age :</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre :</label>
              <div className="flex space-x-4 mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="genre"
                    value="Homme"
                    checked={formData.genre === 'Homme'}
                    onChange={handleFormChange}
                    className="form-radio h-4 w-4 text-espiblue"
                  />
                  <span className="ml-2">Homme</span>
                </label>
                
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="genre"
                    value="Femme"
                    checked={formData.genre === 'Femme'}
                    onChange={handleFormChange}
                    className="form-radio h-4 w-4 text-espiblue"
                  />
                  <span className="ml-2">Femme</span>
                </label>
                
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="genre"
                    value="Autre"
                    checked={formData.genre === 'Autre'}
                    onChange={handleFormChange}
                    className="form-radio h-4 w-4 text-espiblue"
                  />
                  <span className="ml-2">Autre</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone :</label>
              <input
                type="tel"
                name="numero_telephone"
                value={formData.numero_telephone}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse mail :</label>
              <input
                type="email"
                name="adresse_email"
                value={formData.adresse_email}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse postale :</label>
              <input
                type="text"
                name="adresse_postale"
                value={formData.adresse_postale}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de session :</label>
              <input
                type="text"
                name="numero_session"
                value={formData.numero_session}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Centre de formation :</label>
              <input
                type="text"
                name="centre_formation"
                value={formData.centre_formation}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise de travail temporaire :</label>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-espired border border-espired rounded hover:bg-red-50"
            >
              Abandonner
            </button>
            
            <button
              type="button"
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-espigreen text-white rounded hover:bg-green-600"
            >
              Suivant
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  // Existing apprenant profile
  const renderFicheUtilisateur = () => {
    if (!apprenant) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative mb-6">
          <div className="w-full bg-amber-400 h-2 rounded-full">
            <div 
              className="bg-espiblue h-2 rounded-full"
              style={{ width: '30%' }}
            ></div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <User className="mr-2" size={24} />
            Fiche Utilisateur :
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom :</label>
            <input
              type="text"
              value={apprenant.nom}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom :</label>
            <input
              type="text"
              value={apprenant.prenom}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age :</label>
            <input
              type="number"
              value={apprenant.age}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre :</label>
            <div className="flex space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={apprenant.genre === 'Homme'}
                  className="form-radio h-4 w-4 text-espiblue"
                  readOnly
                />
                <span className="ml-2">Homme</span>
              </label>
              
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={apprenant.genre === 'Femme'}
                  className="form-radio h-4 w-4 text-espiblue"
                  readOnly
                />
                <span className="ml-2">Femme</span>
              </label>
              
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={apprenant.genre === 'Autre'}
                  className="form-radio h-4 w-4 text-espiblue"
                  readOnly
                />
                <span className="ml-2">Autre</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone :</label>
            <input
              type="tel"
              value={apprenant.numero_telephone}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse mail :</label>
            <input
              type="email"
              value={apprenant.adresse_email}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse postale :</label>
            <input
              type="text"
              value={apprenant.adresse_postale}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de session :</label>
            <input
              type="text"
              value={`Session ${apprenant.id_session || 'N/A'}`}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Centre de formation :</label>
            <input
              type="text"
              value={apprenant.id_centre === 1 ? 'Colomiers' : apprenant.id_centre === 2 ? 'Bouguenais' : 'Méaulte'}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            className="flex items-center espi-button-primary"
            onClick={() => setActiveTab('evaluation')}
          >
            <Clipboard className="mr-2" size={18} />
            Évaluation préformative
          </button>
          
          <button 
            className="flex items-center px-4 py-2 bg-espiblue text-white rounded hover:bg-blue-700"
          >
            <Save className="mr-2" size={18} />
            Importer profil
          </button>
        </div>
      </div>
    );
  };
  
  // Evaluation form
  const renderEvaluationForm = () => {
    if (!apprenant) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative mb-6">
          <div className="w-full bg-amber-400 h-2 rounded-full">
            <div 
              className="bg-espigreen h-2 rounded-full"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-6">
          Résultats de l'évaluation préformative de "{apprenant.prenom} - {apprenant.nom}" :
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Savoir-être */}
          <div>
            <h3 className="text-lg font-medium mb-4">Savoir-être :</h3>
            <div className="space-y-3">
              {Object.entries(savoirEtre).map(([key, value]) => {
                if (key === 'total') return null;
                
                const label = {
                  organisation: 'Organisation au poste de travail',
                  assiduite: 'Assiduité',
                  dexterite: 'Dextérité',
                  emploiOutils: 'Emploi des outils',
                  dynamisme: 'Dynamisme',
                  respectConsignes: 'Respect des consignes',
                  portEPI: 'Port des EPI',
                  gestionTemps: 'Gestion du temps'
                }[key as keyof typeof savoirEtre] || key;
                
                return (
                  <div key={key} className="flex items-center">
                    <span className="w-64 text-sm">{label}</span>
                    <div className="flex space-x-1 ml-4">
                      {[1, 2, 3, 4, 5].map(n => (
                        <label key={n} className="inline-flex items-center">
                          <input
                            type="radio"
                            checked={value === n}
                            className="form-radio h-4 w-4 text-espiblue"
                            readOnly
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              <div className="flex items-center pt-4 border-t">
                <span className="w-64 font-medium">Total savoir-être :</span>
                <input
                  type="text"
                  value={savoirEtre.total}
                  className="ml-4 w-20 px-3 py-1 border border-gray-300 rounded text-center"
                  readOnly
                />
              </div>
            </div>
          </div>
          
          {/* Savoir-faire métier */}
          <div>
            <h3 className="text-lg font-medium mb-4">Savoir-faire métier :</h3>
            <div className="space-y-3">
              {Object.entries(savoirFaire).map(([key, value]) => {
                if (key === 'total') return null;
                
                const label = {
                  ajustageCote: 'Ajustage cote',
                  ajustageDemiCercle: 'Ajustage demi cercle',
                  calculPerimetre: 'Calcul du périmètre',
                  calculSurface: 'Calcul de la surface',
                  opIdentification: 'OP Identification',
                  tracabiliteFicheSuiveuse: 'Traçabilité fiche suiveuse',
                  conformitePiece: 'Conformité de la pièce',
                  resultatCalculs: 'Résultat calculs'
                }[key as keyof typeof savoirFaire] || key;
                
                return (
                  <div key={key} className="flex items-center">
                    <span className="w-64 text-sm">{label}</span>
                    <div className="flex space-x-1 ml-4">
                      {[1, 2, 3, 4, 5].map(n => (
                        <label key={n} className="inline-flex items-center">
                          <input
                            type="radio"
                            checked={value === n}
                            className="form-radio h-4 w-4 text-espiblue"
                            readOnly
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              <div className="flex items-center pt-4 border-t">
                <span className="w-64 font-medium">Total savoir-faire métier :</span>
                <input
                  type="text"
                  value={savoirFaire.total}
                  className="ml-4 w-20 px-3 py-1 border border-gray-300 rounded text-center"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="col-span-2">
            <div className="flex space-x-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temps passé :</label>
                <input
                  type="text"
                  className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
                  value="4h30"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total EPF :</label>
                <input
                  type="text"
                  className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
                  value={savoirEtre.total + savoirFaire.total}
                  readOnly
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end items-end">
            <div className="space-x-4">
              <button 
                className="px-4 py-2 text-espiblue border border-espiblue rounded hover:bg-blue-50"
                onClick={() => setActiveTab('fiche')}
              >
                Précédent
              </button>
              
              <button 
                className="px-4 py-2 bg-espigreen text-white rounded hover:bg-green-600"
                onClick={handleCalculerParcours}
              >
                Calculer le parcours
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Training path (placeholder)
  const renderParcours = () => {
    return <div>Parcours content</div>;
  };
  
  // Weekly monitoring (placeholder)
  const renderSuivi = () => {
    return <div>Suivi content</div>;
  };
  
  // Grades / Notes (placeholder)
  const renderNotes = () => {
    return <div>Notes content</div>;
  };
  
  // Dashboard (placeholder)
  const renderDashboard = () => {
    return <div>Dashboard content</div>;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={id === 'new' ? 'Nouvel apprenant' : `${apprenant?.prenom} ${apprenant?.nom}`} />
      
      <main className="container mx-auto p-4">
        {/* Tabs for existing apprenants (not shown for new apprenants) */}
        {id !== 'new' && (
          <div className="mb-6 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${activeTab === 'fiche' ? 'border-b-2 border-espiblue text-espiblue' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('fiche')}
                >
                  Fiche utilisateur
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${activeTab === 'evaluation' ? 'border-b-2 border-espiblue text-espiblue' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('evaluation')}
                >
                  Évaluation
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${activeTab === 'parcours' ? 'border-b-2 border-espiblue text-espiblue' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('parcours')}
                >
                  Parcours
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${activeTab === 'suivi' ? 'border-b-2 border-espiblue text-espiblue' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('suivi')}
                >
                  Suivi
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${activeTab === 'notes' ? 'border-b-2 border-espiblue text-espiblue' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('notes')}
                >
                  Notes
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${activeTab === 'dashboard' ? 'border-b-2 border-espiblue text-espiblue' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Tableau de bord
                </button>
              </li>
            </ul>
          </div>
        )}
        
        {/* Content based on active tab */}
        {renderTabContent()}
      </main>
    </div>
  );
};

export default ApprenantProfile;
