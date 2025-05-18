
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/campus-selection');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-comsats-blue">
      <div className="animate-scale-in">
        <img 
          src="/assets/comsats-logo.png" 
          alt="COMSATS Logo" 
          className="w-40 h-40 object-contain"
        />
      </div>
      <h1 className="text-3xl font-bold text-white mt-6 animate-slide-up">
        COMSATS Connect Hub
      </h1>
      <p className="text-white/80 mt-2 animate-slide-up">
        Connecting students across all campuses
      </p>
    </div>
  );
};

export default SplashScreen;
