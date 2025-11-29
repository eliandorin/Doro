import React from 'react';
import { BrandTheme } from '../types';

interface BrandSwitcherProps {
  currentTheme: BrandTheme;
  onThemeChange: (theme: BrandTheme) => void;
}

export const BrandSwitcher: React.FC<BrandSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 p-2 bg-white/90 backdrop-blur border border-gray-200 rounded-xl shadow-2xl">
      <div className="text-[10px] uppercase font-bold text-gray-400 px-2 mb-1 text-center">Select Identity System</div>
      
      <button 
        onClick={() => onThemeChange(BrandTheme.CLINICAL)}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${currentTheme === BrandTheme.CLINICAL ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' : 'hover:bg-gray-100 text-gray-600'}`}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        Clinical Zen
      </button>

      <button 
        onClick={() => onThemeChange(BrandTheme.LUXURY)}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${currentTheme === BrandTheme.LUXURY ? 'bg-stone-800 text-stone-100 ring-2 ring-stone-500' : 'hover:bg-gray-100 text-gray-600'}`}
      >
        <div className="w-2 h-2 bg-stone-900 rounded-full border border-stone-500"></div>
        Midnight Bloom
      </button>

      <button 
        onClick={() => onThemeChange(BrandTheme.HYPE)}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${currentTheme === BrandTheme.HYPE ? 'bg-[#FFFF00] text-black ring-2 ring-black' : 'hover:bg-gray-100 text-gray-600'}`}
      >
        <div className="w-2 h-2 bg-[#FF00FF] border border-black rounded-none"></div>
        Gen Z Hyper-Pop
      </button>
    </div>
  );
};
