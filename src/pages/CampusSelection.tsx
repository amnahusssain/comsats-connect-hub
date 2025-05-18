
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
        
        <div className="grid grid-cols-2 gap-4">
          {campuses.map((campus) => (
            <div
              key={campus.id}
              className={`campus-card ${selected === campus.id ? 'campus-card-selected' : ''}`}
              onClick={() => setSelected(campus.id)}
            >
              <div className="h-24 w-24 mb-3 flex items-center justify-center">
                <img
                  src={campus.image || "/assets/campus-placeholder.jpg"}
                  alt={campus.name}
                  className="h-full w-full object-cover rounded"
                />
              </div>
              <h3 className="text-sm font-medium text-center">{campus.name}</h3>
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
