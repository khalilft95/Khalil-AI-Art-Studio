
import React from 'react';
import { ArtStyle, ArtStyleOption } from '../types';
import { ART_STYLES } from '../constants';

interface StyleSelectorProps {
  selectedStyle: ArtStyle | null;
  onStyleSelect: (style: ArtStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleSelect }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-300"><span className="text-indigo-400 font-bold">2.</span> Select an Art Style</h2>
      <div className="grid grid-cols-2 gap-4">
        {ART_STYLES.map((style: ArtStyleOption) => (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 relative group ${
              selectedStyle === style.id
                ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                : 'border-slate-700 hover:border-slate-500'
            }`}
          >
            <img src={style.thumbnail} alt={style.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
            <p className="absolute bottom-2 left-2 font-semibold text-white text-sm drop-shadow-md">{style.name}</p>
             {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
