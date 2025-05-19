
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { campuses } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';

const CampusSelection = () => {
  const navigate = useNavigate();
  const { setSelectedCampus } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    const selectedCampus = campuses.find(campus => campus.id === selected);
    if (selectedCampus) {
      setSelectedCampus(selectedCampus);
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-comsats-gray p-5">
      <div className="max-w-md mx-auto pt-10">
        <h1 className="text-2xl font-bold text-center text-comsats-blue mb-6">
          Select Your Campus
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choose the COMSATS campus you belong to
        </p>
        
        <div className="grid grid-cols-1 gap-2">
          {campuses.map((campus) => (
            <div
              key={campus.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selected === campus.id 
                  ? 'bg-comsats-blue text-white' 
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => setSelected(campus.id)}
            >
              <h3 className="text-center font-medium">{campus.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <Button
            onClick={handleContinue}
            disabled={!selected}
            className="w-full bg-comsats-blue hover:bg-comsats-blue/90"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampusSelection;
