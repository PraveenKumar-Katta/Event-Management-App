import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-700 px-6">
      <div className="max-w-4xl text-center text-white">
        
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 drop-shadow-lg">
          Welcome to Eventify
        </h1>

        
        <p className="text-xl sm:text-2xl mb-8 opacity-90 leading-relaxed">
          Your all-in-one platform to create, invite, manage events, and track responses seamlessly.
        </p>

        
       
        <button
          onClick={() => navigate('/signup')}
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full text-lg hover:bg-blue-100 transition duration-300 shadow-xl"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default BannerLandingPage;
