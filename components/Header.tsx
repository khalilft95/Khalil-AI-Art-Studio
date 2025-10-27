
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        Khalil AI Art Studio
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Transform your product photos into works of art.
      </p>
    </header>
  );
};

export default Header;
