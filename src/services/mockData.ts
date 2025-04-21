
import {
  Apprenant,
  CentreFormation,
  Formation,
  ParcoursPropose,
  SavoirEtre,
  SavoirFaireMetier,
  ProfilPsychotechnique,
  SuiviHebdo,
  TravauxPratiques,
  EvaluationsTheoriques
} from '@/types';

// Sample training centers
export const centres: CentreFormation[] = [
  { id: 1, nom: 'Colomiers', adresse_mail: 'contact@colomiers.fr', adresse_postale: '1 Rue des Formations, 31770 Colomiers', referent: 'Jean Dupont' },
  { id: 2, nom: 'Bouguenais', adresse_mail: 'contact@bouguenais.fr', adresse_postale: '2 Avenue de l\'Aviation, 44340 Bouguenais', referent: 'Marie Martin' },
  { id: 3, nom: 'Méaulte', adresse_mail: 'contact@meaulte.fr', adresse_postale: '3 Place de l\'Aéronautique, 80300 Méaulte', referent: 'Pierre Durand' }
];

// Sample trainees
export const apprenants: Apprenant[] = [
  {
    id: '1',
    nom: 'DAGONNEAU',
    prenom: 'Tanguy',
    age: 24,
    genre: 'Homme',
    adresse_email: 'tanguy.dagonneau@email.com',
    adresse_postale: '10 Rue des Aviateurs, 31700 Toulouse',
    numero_telephone: '0601020304',
    id_session: 17,
    id_centre: 1,
    chance_reussite_cgpm: 78
  },
  {
    id: '2',
    nom: 'CASSAIGNE',
    prenom: 'Camille',
    age: 22,
    genre: 'Femme',
    adresse_email: 'camille.cassaigne@email.com',
    adresse_postale: '25 Avenue du Ciel, 44000 Nantes',
    numero_telephone: '0607080910',
    id_session: 4,
    id_centre: 2,
    chance_reussite_cgpm: 92
  },
  {
    id: '3',
    nom: 'ANSIDEI',
    prenom: 'Marc',
    age: 27,
    genre: 'Homme',
    adresse_email: 'marc.ansidei@email.com',
    adresse_postale: '5 Impasse des Ingénieurs, 80000 Amiens',
    numero_telephone: '0611121314',
    id_session: 11,
    id_centre: 3,
    chance_reussite_cgpm: 85
  }
];

// Sample trainings/formations
export const formations: Formation[] = [
  {
    id: '1',
    nom: 'Ajusteur-Monteur',
    code: 'CQPM 187',
    description: 'Formation pour devenir ajusteur-monteur dans l\'aéronautique'
  },
  {
    id: '2',
    nom: 'Technicien de maintenance',
    code: 'CQPM 137',
    description: 'Formation pour devenir technicien de maintenance'
  },
  {
    id: '3',
    nom: 'Inspecteur Qualité',
    code: 'Formation Inspecteur Qualité',
    description: 'Formation pour devenir inspecteur qualité'
  },
  {
    id: '4',
    nom: 'Opérateur de production',
    code: 'Formation Opérateur de production',
    description: 'Formation pour devenir opérateur de production'
  }
];

// Sample skills evaluation - "savoir-être"
export const getSavoirEtre = (apprenantId: string): SavoirEtre => {
  const baseData = {
    organisation: 3,
    assiduite: 4,
    dexterite: 3,
    emploiOutils: 4,
    dynamisme: 4,
    respectConsignes: 3,
    portEPI: 5,
    gestionTemps: 3,
    total: 0
  };
  
  // Calculate total
  const total = Object.values(baseData).reduce((sum, val) => typeof val === 'number' ? sum + val : sum, 0) - baseData.total;
  
  return { ...baseData, total };
};

// Sample professional skills - "savoir-faire"
export const getSavoirFaireMetier = (apprenantId: string): SavoirFaireMetier => {
  const baseData = {
    ajustageCote: 4,
    ajustageDemiCercle: 3,
    calculPerimetre: 5,
    calculSurface: 4,
    opIdentification: 3,
    tracabiliteFicheSuiveuse: 4,
    conformitePiece: 4,
    resultatCalculs: 3,
    total: 0
  };
  
  // Calculate total
  const total = Object.values(baseData).reduce((sum, val) => typeof val === 'number' ? sum + val : sum, 0) - baseData.total;
  
  return { ...baseData, total };
};

// Sample psychotechnical profile
export const getProfilPsychotechnique = (apprenantId: string): ProfilPsychotechnique => {
  return {
    capacitesLecture: 8,
    calculMental: 7,
    capacitesSpatialisation: 9,
    capacitesAnalyse: 7,
    capacitesTransfert: 8
  };
};

// Sample weekly follow-up data
export const getSuiviHebdo = (apprenantId: string): SuiviHebdo[] => {
  const dates = ['24/01/2025', '01/02/2025', '08/02/2025', '15/02/2025', '22/02/2025'];
  
  return dates.map(semaine => ({
    semaine,
    retard: Math.floor(Math.random() * 5) + 1,
    absence: Math.floor(Math.random() * 3) + 1,
    motivation: Math.floor(Math.random() * 5) + 1,
    reactivite: Math.floor(Math.random() * 5) + 1,
    capaciteEcoute: Math.floor(Math.random() * 5) + 1,
    respectHierarchie: Math.floor(Math.random() * 5) + 1,
    travailEquipe: Math.floor(Math.random() * 5) + 1,
    respectReglement: Math.floor(Math.random() * 3) + 3,
    portEPI: Math.floor(Math.random() * 3) + 3,
    respectSS: Math.floor(Math.random() * 3) + 3,
    gestionTemps: Math.floor(Math.random() * 5) + 1,
    autoControle: Math.floor(Math.random() * 5) + 1,
    qualiteTravail: Math.floor(Math.random() * 5) + 1
  }));
};

// Sample practical works data
export const getTravauxPratiques = (apprenantId: string): TravauxPratiques[] => {
  return [
    { nom: 'Initiation ajustage 1', note: 85, heures: 14 },
    { nom: 'Évaluation perçage 1', note: 92, heures: 25 },
    { nom: 'TP vague', note: 78, heures: 13 },
    { nom: 'Évaluation fraisage 1', note: 88, heures: 18 }
  ];
};

// Sample theoretical evaluations data
export const getEvaluationsTheoriques = (apprenantId: string): EvaluationsTheoriques[] => {
  return [
    { nom: 'Alodine', note: 91, heures: 14 },
    { nom: 'Dossier avion', note: 85, heures: 25 },
    { nom: 'Lamage', note: 79, heures: 13 }
  ];
};

// AI-recommended training path
export const getParcoursPropose = (apprenantId: string): ParcoursPropose => {
  // Get the apprenant
  const apprenant = apprenants.find(a => a.id === apprenantId);
  
  // Base training path
  const parcours: ParcoursPropose = {
    modules: [
      { nom: 'Initiation ajustage 1', type: 'TP', temps: 14 },
      { nom: 'Évaluation perçage 1', type: 'TP', temps: 25 },
      { nom: 'TP vague', type: 'TP', temps: 13 },
      { nom: 'Alodine', type: 'Cours', temps: 14 },
      { nom: 'Dossier avion', type: 'Cours', temps: 25 },
      { nom: 'Lamage', type: 'Cours', temps: 13 }
    ],
    heuresTP: 45,
    heuresCours: 30,
    heuresTotales: 485,
    chancesReussite: apprenant?.chance_reussite_cgpm || 78,
    tempsSupplementaire: 30,
    explication: "Basé sur l'analyse de vos résultats aux évaluations préformatives et psychotechniques, nous avons défini un parcours personnalisé. Vos capacités de spatialisation sont excellentes, ce qui est un atout pour ce métier. Cependant, nous recommandons un temps supplémentaire pour renforcer les compétences en ajustage et calcul de surfaces. Ce parcours vous permettra d'atteindre le niveau requis pour obtenir votre qualification avec d'excellentes chances de réussite."
  };
  
  return parcours;
};

// Get grades for a subject
export const getNotesMatiere = (matiere: string, apprenantId: string) => {
  // Random grade between 70 and 100
  return Math.floor(Math.random() * 30) + 70;
};

// AI explanation for the training path choice
export const getExplicationAI = (apprenantId: string): string => {
  return "L'analyse de vos compétences techniques et comportementales révèle un profil adapté aux métiers de l'aéronautique. Vos points forts sont la spatialisation et la précision technique. Nous recommandons un parcours orienté vers l'ajustage avec des modules complémentaires en lecture de plans. Ce parcours optimisé vous permettra de développer rapidement les compétences requises tout en renforçant vos acquis existants.";
};
