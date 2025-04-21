
export interface User {
  id: string;
  email: string;
  password?: string; // Not stored in frontend
  role: 'admin' | 'formateur' | 'coordinateur' | 'apprenant';
}

export interface Apprenant {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  genre: 'Homme' | 'Femme' | 'Autre';
  adresse_email: string;
  adresse_postale: string;
  numero_telephone: string;
  id_session?: number;
  id_centre?: number;
  id_entreprise?: number;
  id_groupe?: number;
  id_notes_tp?: number;
  id_notes_psycho?: number;
  id_notes_preform?: number;
  id_temps_tp?: number;
  id_temps_matiere?: number;
  id_temps_psycho?: number;
  id_temps_preform?: number;
  id_temps_tp_s?: number;
  id_temps_matiere_s?: number;
  id_temps_psycho_s?: number;
  raison_decrochage?: string;
  chance_reussite_cgpm?: number;
}

export interface CentreFormation {
  id: number;
  nom: string;
  adresse_mail: string;
  adresse_postale: string;
  referent: string;
}

export interface Groupe {
  id: number;
  nom_groupe: string;
}

export interface SessionFormation {
  id: number;
  nom_session: string;
  mois_de_passe: string;
  id_coordinateur: number;
}

export interface Matiere {
  id: number;
  nom_matiere: string;
}

export interface Formateur {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  genre: string;
  adresse_mail: string;
  adresse_postale: string;
  numero_telephone: string;
  id_centre: number;
}

export interface Coordinateur {
  id: number;
  nom: string;
  prenom: string;
  adresse_postale: string;
  adresse_mail: string;
}

export interface TestPreformative {
  id: number;
  nom_test: string;
  id_test: number;
}

export interface TestPsychotechnique {
  id: number;
  nom_test: string;
  id_test: number;
}

export interface NotesMatiere {
  id: number;
  id_matiere: number;
  time_semaine: string;
  note: number;
}

export interface NotesPreformative {
  id: number;
  id_notes_preform: number;
  time_semaine: string;
  note: number;
}

export interface NotesPsychotechnique {
  id: number;
  id_notes_psycho: number;
  id_test: number;
  time_semaine: string;
}

export interface TempsTpConsomme {
  id: number;
  id_temps_tp: number;
  temps_consomme: number;
}

export interface TempsTP {
  id: number;
  temps_prevu: number;
}

export interface TempsMatiere {
  id: number;
  id_matiere: number;
  temps_prevu: number;
}

export interface TempsMatierConsomme {
  id: number;
  id_temps_matiere: number;
  temps_consomme: number;
}

export interface TempsPsychoConsomme {
  id: number;
  id_temps_psycho: number;
  temps_consomme: number;
}

export interface TempsPreformConsomme {
  id: number;
  id_temps_preform: number;
  temps_consomme: number;
}

export interface TempsTpSupplementaire {
  id: number;
  id_temps_tp_s: number;
  temps_supplementaire: number;
}

export interface TempsPreformativeConsomme {
  id: number;
  id_temps_preform_c: number;
  id_preformative: number;
  temps_consomme: number;
}

export interface TempsMatierSupplementaire {
  id: number;
  id_temps_matiere_s: number;
  id_matiere: number;
  temps_supplementaire: number;
}

export interface TempsPsychoSupplementaire {
  id: number;
  id_temps_psycho_s: number;
  id_test: number;
  temps_supplementaire: number;
}

export interface CommissionCoordinateur {
  id: number;
  nom: string;
  mois_de_passe: string;
  id_coordinateur: number;
}

export interface Entreprise {
  id: number;
  nom: string;
  referent: string;
  adresse_postale: string;
  adresse_mail: string;
  numero_telephone_portable: string;
}

// For skills evaluation as seen in the UI
export interface SavoirEtre {
  organisation: number; // 1-5
  assiduite: number; // 1-5
  dexterite: number; // 1-5
  emploiOutils: number; // 1-5
  dynamisme: number; // 1-5
  respectConsignes: number; // 1-5
  portEPI: number; // 1-5
  gestionTemps: number; // 1-5
  total: number; // Computed
}

export interface SavoirFaireMetier {
  ajustageCote: number; // 1-5
  ajustageDemiCercle: number; // 1-5
  calculPerimetre: number; // 1-5
  calculSurface: number; // 1-5
  opIdentification: number; // 1-5
  tracabiliteFicheSuiveuse: number; // 1-5
  conformitePiece: number; // 1-5
  resultatCalculs: number; // 1-5
  total: number; // Computed
}

export interface ProfilPsychotechnique {
  capacitesLecture: number; // 1-10
  calculMental: number; // 1-10
  capacitesSpatialisation: number; // 1-10
  capacitesAnalyse: number; // 1-10
  capacitesTransfert: number; // 1-10
}

export interface SuiviHebdo {
  semaine: string;
  retard: number; // 1-5
  absence: number; // 1-5
  motivation: number; // 1-5
  reactivite: number; // 1-5
  capaciteEcoute: number; // 1-5
  respectHierarchie: number; // 1-5
  travailEquipe: number; // 1-5
  respectReglement: number; // 1-5
  portEPI: number; // 1-5
  respectSS: number; // 1-5
  gestionTemps: number; // 1-5
  autoControle: number; // 1-5
  qualiteTravail: number; // 1-5
}

export interface TravauxPratiques {
  nom: string;
  note: number;
  heures: number;
}

export interface EvaluationsTheoriques {
  nom: string;
  note: number;
  heures: number;
}

export interface ParcoursModule {
  nom: string;
  type: 'TP' | 'Cours' | 'Evaluation';
  temps: number;
}

export interface ParcoursPropose {
  modules: ParcoursModule[];
  heuresTP: number;
  heuresCours: number;
  heuresTotales: number;
  chancesReussite: number;
  tempsSupplementaire: number;
  explication: string;
}

export interface Formation {
  id: string;
  nom: string;
  description: string;
  code: string;
}
