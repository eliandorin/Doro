import React, { useState, useEffect } from 'react';
import { GeneratedCopy, BrandTheme } from '../types';
import { generateBrandCopy } from '../services/geminiService';

export const LuxuryLayout: React.FC = () => {
  const [copy, setCopy] = useState<GeneratedCopy | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchCopy = async () => {
      const res = await generateBrandCopy(BrandTheme.LUXURY);
      setCopy(res);
    };
    fetchCopy();
  }, []);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-200 font-serif selection:bg-rose-900 selection:text-white">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#4c0519_0%,_transparent_50%)]"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-8 md:px-12">
        <div className="text-2xl tracking-widest font-serif italic text-stone-100">Axis Core.</div>
        <button className="hidden md:block text-xs uppercase tracking-[0.3em] hover:text-rose-300 transition-colors">The Ritual</button>
        <div className="text-xs uppercase tracking-[0.2em] text-stone-400">Est. 2024</div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-screen-xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Col: Typography & Story */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl leading-[1.1] font-serif">
              {copy ? copy.headline : "The Night \nReclaimed."}
            </h1>
            <div className="w-12 h-[1px] bg-rose-800"></div>
            <p className="text-lg md:text-xl text-stone-400 font-sans font-light leading-relaxed">
              {copy ? copy.body : "A fragrant descent into silence. The Axis Core neuro-restoration ritual dissolves the day's tension, leaving only stillness."}
            </p>
          </div>

          <div className="flex flex-col gap-6">
             <button className="group flex items-center justify-between w-full max-w-sm py-4 border-b border-stone-700 hover:border-rose-400 transition-all">
               <span className="uppercase tracking-widest text-xs font-sans text-stone-300 group-hover:text-white">Begin The Journey</span>
               <span className="font-serif italic text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">Acquire &rarr;</span>
             </button>
             <button className="group flex items-center justify-between w-full max-w-sm py-4 border-b border-stone-700 hover:border-rose-400 transition-all">
               <span className="uppercase tracking-widest text-xs font-sans text-stone-300 group-hover:text-white">The Science of Scent</span>
               <span className="font-serif italic text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">Discover &rarr;</span>
             </button>
          </div>
        </div>

        {/* Right Col: Imagery */}
        <div className="lg:col-span-7 relative h-[600px] w-full">
           <div className="absolute inset-0 z-10 flex items-center justify-center">
             <div className="relative w-full h-full max-w-md mx-auto overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-20"></div>
               {/* Image Stack */}
               <img 
                 src="https://picsum.photos/seed/axisrose/600/800" 
                 alt="Mood"
                 className="w-full h-full object-cover opacity-80 mix-blend-lighten grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
               />
               
               {/* Floating Product Card - Luxury Style */}
               <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-3/4 z-30">
                 <div className="backdrop-blur-md bg-stone-800/40 border border-stone-700/50 p-6 text-center shadow-2xl">
                    <p className="font-serif italic text-2xl mb-2 text-rose-100">Essence of Damask</p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">Vaporizer Collection</p>
                    <button className="bg-stone-100 text-stone-900 px-8 py-3 text-xs uppercase tracking-widest hover:bg-rose-100 transition-colors">
                      $49 / Month
                    </button>
                 </div>
               </div>
             </div>
           </div>

           {/* Decorative Orbit Lines */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-stone-800 rounded-full opacity-30 animate-[spin_60s_linear_infinite]"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-stone-800 rounded-full opacity-20 animate-[spin_90s_linear_infinite_reverse]"></div>
        </div>

      </main>
    </div>
  );
};
