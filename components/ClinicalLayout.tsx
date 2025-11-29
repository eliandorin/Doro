import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { GeneratedCopy, BrandTheme } from '../types';
import { generateBrandCopy } from '../services/geminiService';

const data = [
  { name: '0m', cortisol: 20 },
  { name: '2m', cortisol: 18 },
  { name: '4m', cortisol: 12 },
  { name: '6m', cortisol: 8 },
  { name: '8m', cortisol: 5 },
  { name: '10m', cortisol: 4 },
];

export const ClinicalLayout: React.FC = () => {
  const [copy, setCopy] = useState<GeneratedCopy | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCopy = async () => {
      setLoading(true);
      const res = await generateBrandCopy(BrandTheme.CLINICAL);
      setCopy(res);
      setLoading(false);
    };
    fetchCopy();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="font-mono text-sm tracking-tighter font-bold uppercase text-slate-900">AXIS:CORE_LABS</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Research</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Data</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Product</a>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors">
            Order Sample
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-[10px] font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            System Version 2.0
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900">
            {loading ? <span className="animate-pulse bg-slate-200 text-transparent rounded">Loading Data...</span> : copy?.headline || "Neuro-Chemical HPA Regulation"}
          </h1>
          
          <p className="text-lg text-slate-500 max-w-md leading-relaxed font-light">
             {loading ? <span className="animate-pulse bg-slate-200 text-transparent rounded block h-20"></span> : copy?.body || "Targeted vapor dispersion technology designed to accelerate cortisol reduction through olfactory pathway activation."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="h-12 px-8 bg-blue-600 text-white text-sm font-semibold rounded-sm shadow-sm hover:bg-blue-700 hover:shadow-md transition-all flex items-center justify-center gap-2">
              Initialize Protocol
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="h-12 px-8 border border-slate-300 text-slate-600 text-sm font-semibold rounded-sm hover:bg-slate-50 transition-all">
              View Clinical Data
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
            <div>
              <div className="text-2xl font-light text-slate-900">43%</div>
              <div className="text-xs text-slate-500 font-mono uppercase mt-1">Cortisol Reduction</div>
            </div>
            <div>
              <div className="text-2xl font-light text-slate-900">&lt; 5m</div>
              <div className="text-xs text-slate-500 font-mono uppercase mt-1">Onset Latency</div>
            </div>
            <div>
              <div className="text-2xl font-light text-slate-900">98%</div>
              <div className="text-xs text-slate-500 font-mono uppercase mt-1">Bio-Availability</div>
            </div>
          </div>
        </div>

        {/* Visual / Chart */}
        <div className="relative bg-white rounded-xl shadow-2xl border border-slate-100 p-8 overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400"></div>
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-mono text-xs uppercase text-slate-400">Real-time Analysis</h3>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-400"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                 <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
           </div>
           
           <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', fontSize: '12px' }} 
                  itemStyle={{ color: '#0f172a' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cortisol" 
                  stroke="#0ea5e9" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
           </div>
           
           <div className="mt-6 flex items-center justify-between p-4 bg-slate-50 rounded border border-slate-100">
             <div className="flex items-center gap-3">
               <img src="https://picsum.photos/seed/axiscore1/100/100" className="w-12 h-12 rounded bg-slate-200 object-cover grayscale" alt="Product Device" />
               <div>
                 <div className="text-sm font-bold text-slate-900">Axis Vaporizer Unit</div>
                 <div className="text-xs text-slate-500 font-mono">SN: 8492-XJ</div>
               </div>
             </div>
             <div className="text-right">
               <div className="text-sm font-mono text-blue-600 font-bold">$49.00</div>
               <div className="text-[10px] text-slate-400">PER MONTH</div>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
};
