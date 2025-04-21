
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formations } from '@/services/mockData';

const FormationSelection = () => {
  const navigate = useNavigate();
  
  const handleSelectFormation = (id: string) => {
    navigate(`/dashboard`);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <header className="bg-espiblue text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">ESPI+</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-8">Sélectionner une formation :</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formations.map(formation => (
            <button
              key={formation.id}
              className={`p-6 rounded-lg text-white font-medium text-center transition-transform hover:scale-105 ${
                formation.id === '1' ? 'bg-blue.600' : 'bg-espigreen'
              }`}
              onClick={() => handleSelectFormation(formation.id)}
            >
              {formation.code}
              <br />
              {formation.nom}
            </button>
          ))}
        </div>
      </main>
      
      <footer className="text-center py-4">
        <img 
          src="/lovable-uploads/1cb3eaaf-f19a-4907-8752-af1dd5e30702.png" 
          alt="Maser Engineering" 
          className="h-10 inline-block"
        />
      </footer>
    </div>
  );
};

export default FormationSelection;
