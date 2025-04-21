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
  
  // Training path content
  const renderParcours = () => {
    if (!apprenant) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative mb-6">
          <div className="w-full bg-amber-400 h-2 rounded-full">
            <div 
              className="bg-espigreen h-2 rounded-full"
              style={{ width: '90%' }}
            ></div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <BookOpen className="mr-2" size={24} />
          Parcours proposé pour "{apprenant.prenom} {apprenant.nom}" :
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Module list */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-3">Modules proposés :</h3>
              
              <div className="space-y-3">
                {parcours.modules.map((module, index) => (
                  <div key={index} className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                    <div>
                      <span className="font-medium">{module.nom}</span>
                      <span className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
                        module.type === 'TP' ? 'bg-blue-100 text-blue-800' : 
                        module.type === 'Cours' ? 'bg-green-100 text-green-800' : 
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {module.type}
                      </span>
                    </div>
                    <div className="text-gray-600">{module.temps}h</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Stats and actions */}
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-3">Statistiques :</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Heures TP :</span>
                  <span className="font-medium">{parcours.heuresTP}h</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Heures Cours :</span>
                  <span className="font-medium">{parcours.heuresCours}h</span>
                </div>
                
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-medium">Heures totales :</span>
                  <span className="font-medium">{parcours.heuresTotales}h</span>
                </div>
                
                <div className="flex justify-between pt-4">
                  <span>Temps supplémentaire :</span>
                  <span className="font-medium text-espiblue">{parcours.tempsSupplementaire}h</span>
                </div>
                
                <div className="flex justify-between pt-4">
                  <span>Chances de réussite :</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-300 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          parcours.chancesReussite >= 80 ? 'bg-green-500' : 
                          parcours.chancesReussite >= 60 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${parcours.chancesReussite}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{parcours.chancesReussite}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleCalculerParcours}
                className="w-full flex justify-center items-center px-4 py-2 bg-espiblue text-white rounded hover:bg-blue-700"
              >
                <RefreshCcw className="mr-2" size={18} />
                Recalculer
              </button>
              
              <button 
                onClick={handleValiderParcours}
                className="w-full flex justify-center items-center px-4 py-2 bg-espigreen text-white rounded hover:bg-green-600"
              >
                <CheckCircle className="mr-2" size={18} />
                Valider le parcours
              </button>
              
              <button 
                className="w-full flex justify-center items-center px-4 py-2 border border-espiblue text-espiblue rounded hover:bg-blue-50"
              >
                <Download className="mr-2" size={18} />
                Exporter en PDF
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Explication de l'IA :</h3>
          <p className="text-gray-700 leading-relaxed">{parcours.explication}</p>
        </div>
      </div>
    );
  };
  
  // Weekly monitoring content
  const renderSuivi = () => {
    if (!apprenant) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Calendar className="mr-2" size={24} />
          Suivi hebdomadaire :
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semaine
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Retard
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Absence
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motivation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Réactivité
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Port EPI
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Respect SS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualité travail
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suiviHebdo.map((semaine, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {semaine.semaine}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${semaine.retard * 20}%` }}></div>
                      </div>
                      <span>{semaine.retard}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${semaine.absence * 20}%` }}></div>
                      </div>
                      <span>{semaine.absence}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${semaine.motivation * 20}%` }}></div>
                      </div>
                      <span>{semaine.motivation}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${semaine.reactivite * 20}%` }}></div>
                      </div>
                      <span>{semaine.reactivite}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${semaine.portEPI * 20}%` }}></div>
                      </div>
                      <span>{semaine.portEPI}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${semaine.respectSS * 20}%` }}></div>
                      </div>
                      <span>{semaine.respectSS}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${semaine.qualiteTravail * 20}%` }}></div>
                      </div>
                      <span>{semaine.qualiteTravail}/5</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-espiblue text-white rounded hover:bg-blue-700">
            Ajouter une semaine
          </button>
        </div>
      </div>
    );
  };
  
  // Grades / Notes content
  const renderNotes = () => {
    if (!apprenant) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <FileText className="mr-2" size={24} />
          Notes et évaluations :
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Travaux Pratiques */}
          <div>
            <h3 className="text-lg font-medium mb-4">Travaux Pratiques :</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heures</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {travauxPratiques.map((tp, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm">{tp.nom}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                tp.note >= 80 ? 'bg-green-500' : 
                                tp.note >= 60 ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`}
                              style={{ width: `${tp.note}%` }}
                            ></div>
                          </div>
                          <span>{tp.note}/100</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{tp.heures}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Moyenne TP :</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                  <div 
                    className="bg-green-500 h-4 rounded-full"
                    style={{ 
                      width: `${travauxPratiques.reduce((sum, tp) => sum + tp.note, 0) / travauxPratiques.length}%` 
                    }}
                  ></div>
                </div>
                <span className="font-bold">
                  {(travauxPratiques.reduce((sum, tp) => sum + tp.note, 0) / travauxPratiques.length).toFixed(1)}/100
                </span>
              </div>
            </div>
          </div>
          
          {/* Evaluations Théoriques */}
          <div>
            <h3 className="text-lg font-medium mb-4">Évaluations Théoriques :</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heures</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {evaluationsTheoriques.map((evaluation, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm">{evaluation.nom}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                evaluation.note >= 80 ? 'bg-green-500' : 
                                evaluation.note >= 60 ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`}
                              style={{ width: `${evaluation.note}%` }}
                            ></div>
                          </div>
                          <span>{evaluation.note}/100</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{evaluation.heures}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Moyenne Théorique :</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                  <div 
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ 
                      width: `${evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.note, 0) / evaluationsTheoriques.length}%` 
                    }}
                  ></div>
                </div>
                <span className="font-bold">
                  {(evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.note, 0) / evaluationsTheoriques.length).toFixed(1)}/100
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Moyenne Générale :</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-6 mr-3">
              <div 
                className="bg-espiblue h-6 rounded-full"
                style={{ 
                  width: `${(
                    travauxPratiques.reduce((sum, tp) => sum + tp.note, 0) / travauxPratiques.length * 0.6 +
                    evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.note, 0) / evaluationsTheoriques.length * 0.4
                  )}%` 
                }}
              ></div>
            </div>
            <span className="font-bold text-xl">
              {(
                travauxPratiques.reduce((sum, tp) => sum + tp.note, 0) / travauxPratiques.length * 0.6 +
                evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.note, 0) / evaluationsTheoriques.length * 0.4
              ).toFixed(1)}/100
            </span>
          </div>
          
          <p className="text-gray-600 mt-2 text-sm">60% travaux pratiques, 40% évaluations théoriques</p>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-4 py-2 border border-espiblue text-espiblue rounded hover:bg-blue-50">
            <Download className="inline mr-2" size={18} />
            Exporter résultats
          </button>
          <button className="px-4 py-2 bg-espigreen text-white rounded hover:bg-green-600">
            Ajouter une évaluation
          </button>
        </div>
      </div>
    );
  };
  
  // Dashboard (placeholder)
  const renderDashboard = () => {
    if (!apprenant) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <BarChart3 className="mr-2" size={24} />
          Tableau de bord pour {apprenant.prenom} {apprenant.nom}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-3 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Progression globale :</h3>
            <div className="w-full bg-gray-200 h-6 rounded-full">
              <div
                className="bg-espiblue h-6 rounded-full flex items-center justify-end pr-2 text-white text-sm font-medium"
                style={{ width: '65%' }}
              >
                65%
              </div>
            </div>
            
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Démarrage</span>
              <span>Mi-parcours</span>
              <span>Évaluations finales</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Heures de travail :</h3>
            <div className="text-3xl font-bold text-espiblue mb-2">
              {travauxPratiques.reduce((sum, tp) => sum + tp.heures, 0) + 
               evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.heures, 0)}h
               <span className="text-sm font-normal text-gray-500 ml-2">/ {parcours.heuresTotales}h</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-espiblue h-2 rounded-full"
                style={{ 
                  width: `${(travauxPratiques.reduce((sum, tp) => sum + tp.heures, 0) + 
                          evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.heures, 0)) / 
                          parcours.heuresTotales * 100}%` 
                }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Moyenne actuelle :</h3>
            <div className="text-3xl font-bold text-espigreen mb-2">
              {(
                travauxPratiques.reduce((sum, tp) => sum + tp.note, 0) / travauxPratiques.length * 0.6 +
                evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.note, 0) / evaluationsTheoriques.length * 0.4
              ).toFixed(1)}
              <span className="text-sm font-normal text-gray-500 ml-1">/ 100</span>
            </div>
            <div className="flex items-center text-sm">
              <span className={`inline-block w-3 h-3 rounded-full mr-1 ${
                (travauxPratiques.reduce((sum, tp) => sum + tp.note, 0) / travauxPratiques.length * 0.6 +
                evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.note, 0) / evaluationsTheoriques.length * 0.4) >= 80 
                ? 'bg-green-500' : 'bg-yellow-500'
              }`}></span>
              <span>
                {(travauxPratiques.reduce((sum, tp) => sum + tp.note, 0) / travauxPratiques.length * 0.6 +
                evaluationsTheoriques.reduce((sum, evaluation) => sum + evaluation.note, 0) / evaluationsTheoriques.length * 0.4) >= 80 
                ? 'Très bon niveau' : 'En progression'}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Chance de réussite :</h3>
            <div className="text-3xl font-bold text-espiblue mb-2">
              {parcours.chancesReussite}%
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className={`h-2 rounded-full ${
                  parcours.chancesReussite >= 80 ? 'bg-green-500' : 
                  parcours.chancesReussite >= 60 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${parcours.chancesReussite}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Points forts :</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span>Capacités de spatialisation exceptionnelles (niveau 9/10)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span>Excellente précision dans les calculs (notes &gt; 85%)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span>Respect exemplaire des consignes de sécurité</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span>Bonne capacité d'adaptation aux nouvelles tâches</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Points à améliorer :</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="text-yellow-500 mr-2 mt-1">⚠️</div>
                <span>Gestion du temps sur certains travaux pratiques</span>
              </li>
              <li className="flex items-start">
                <div className="text-yellow-500 mr-2 mt-1">⚠️</div>
                <span>Organisation au poste de travail (noté 3/5)</span>
              </li>
              <li className="flex items-start">
                <div className="text-yellow-500 mr-2 mt-1">⚠️</div>
                <span>Quelques retards en début de formation</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 border border-espiblue text-espiblue rounded hover:bg-blue-50">
            <Download className="inline mr-2" size={18} />
            Exporter rapport complet
          </button>
        </div>
      </div>
    );
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
