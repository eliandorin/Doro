import React, { useState, useEffect } from 'react';

// --- Types & Data ---

type ProductType = 'HOOK' | 'HABIT';

interface ProductData {
  id: ProductType;
  name: string;
  price: number;
  shipping: number;
  subtitle: string;
  description: string;
  includes: string[];
  tag: string;
  sku: string;
  specs: {
    details: { label: string; value: string }[];
    mission: string[];
  }
}

interface CartItem {
  id: string; // Unique ID for cart entry (product + variant if we had variants)
  productId: ProductType;
  quantity: number;
  product: ProductData;
}

const PRODUCTS: Record<ProductType, ProductData> = {
  HOOK: {
    id: 'HOOK',
    name: 'THE HOOK (TRIAL)',
    price: 19.00,
    shipping: 4.95,
    subtitle: '7-DAY SKEPTIC PROTOCOL',
    description: "You've tried everything else. Melatonin grogginess. Smart rings that just tell you how poorly you slept. This is your 7-day audit. Verify the mechanism before you commit to the lifestyle.",
    includes: ['7x Neuro-Primer Tablets', '1x Digital Sleep Audit', 'Zero Commitment'],
    tag: 'STARTER PACK',
    sku: 'AX-001-TRL',
    specs: {
      details: [
        { label: 'PRIMARY AGENT', value: 'LINALOOL (RAPID UPTAKE)' },
        { label: 'SUPPLY', value: '7 DOSES (1 WEEK)' },
        { label: 'PACKAGING', value: 'STANDARD RESEALABLE' },
        { label: 'OBJECTIVE', value: 'VALIDATION' }
      ],
      mission: [
        "Objective: Test efficacy of olfactory pathway.",
        "Duration: 7 consecutive nights.",
        "Failure Condition: If sleep does not improve, system is incompatible. Refund issued.",
        "Success Condition: Proceed to Monthly Automation."
      ]
    }
  },
  HABIT: {
    id: 'HABIT',
    name: 'THE HABIT (SUB)',
    price: 59.00,
    shipping: 0,
    subtitle: 'SYSTEM AUTOMATION',
    description: "Consistency is the only biohack that matters. Automate your recovery. Ensure your bathroom is stocked before you run out. The highest ROI for your sleep, delivered on autopilot.",
    includes: ['28x Neuro-Primer Tablets', 'Priority Free Shipping', 'VIP Lab Access', 'Premium Storage Tin (First Order)'],
    tag: 'PRO LOADOUT',
    sku: 'AX-002-SUB',
    specs: {
      details: [
        { label: 'PRIMARY AGENT', value: 'LINALOOL (SUSTAINED)' },
        { label: 'SUPPLY', value: '28 DOSES (4 WEEKS)' },
        { label: 'PACKAGING', value: 'REFILLABLE TIN + ECO BAG' },
        { label: 'OBJECTIVE', value: 'OPTIMIZATION' }
      ],
      mission: [
        "Objective: Maintain Cortisol/HPA regulation.",
        "Frequency: Auto-ship every 30 days.",
        "Flexibility: Pause or Cancel anytime via SMS.",
        "Perks: Early access to new scents (Lavender/Bergamot) beta tests."
      ]
    }
  }
};

// --- Shared Components ---

const MarqueeBar = () => (
  <div className="bg-black text-white overflow-hidden py-3 border-b-4 border-black z-50 relative">
    <div className="whitespace-nowrap animate-marquee inline-block font-mono text-sm font-bold">
      <span className="mx-4">⚠ SYSTEM ERROR: SLEEP NOT FOUND</span>
      <span className="mx-4 text-[#FF00FF]">///</span>
      <span className="mx-4">CORTISOL SPIKE DETECTED</span>
      <span className="mx-4 text-[#FF00FF]">///</span>
      <span className="mx-4">INITIATING AXIS CORE PROTOCOL</span>
      <span className="mx-4 text-[#FF00FF]">///</span>
      <span className="mx-4">BIO-HACK YOUR NIGHT</span>
      <span className="mx-4 text-[#FF00FF]">///</span>
      <span className="mx-4">⚠ SYSTEM ERROR: SLEEP NOT FOUND</span>
      <span className="mx-4 text-[#FF00FF]">///</span>
      <span className="mx-4">CORTISOL SPIKE DETECTED</span>
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
      .brutal-shadow {
        box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
      }
      .brutal-shadow-hover:hover {
        box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
        transform: translate(4px, 4px);
      }
      .brutal-shadow-sm {
        box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
      }
    `}</style>
  </div>
);

const Navbar = ({ onBack, showBack, cartCount, onOpenCart }: { onBack?: () => void, showBack?: boolean, cartCount: number, onOpenCart: () => void }) => {
  const scrollToOffer = () => {
    const section = document.getElementById('offer-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-6 border-b-4 border-black bg-[#FFFF00] sticky top-0 z-40">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        {showBack && (
          <button onClick={onBack} className="bg-white p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        <div className="text-5xl font-black uppercase tracking-tighter italic transform -skew-x-12 cursor-pointer" onClick={onBack}>
          AXIS:CORE™
        </div>
      </div>
      <div className="flex gap-4">
         <div className="hidden md:block px-4 py-2 font-mono text-xs font-bold border-2 border-black bg-white uppercase">
            Status: {showBack ? 'ARMED' : 'DISCONNECTED'}
         </div>
         <button onClick={onOpenCart} className="bg-[#FF00FF] text-white px-8 py-2 font-bold uppercase border-4 border-black brutal-shadow brutal-shadow-hover transition-all flex items-center gap-2">
           <span>Cart ({cartCount})</span>
         </button>
         {!showBack && (
            <button onClick={scrollToOffer} className="hidden md:block bg-black text-white px-6 py-2 font-bold uppercase border-4 border-black hover:bg-white hover:text-black transition-colors">
              Get The Hack
            </button>
         )}
      </div>
    </nav>
  );
};

// --- Cart Drawer Component ---

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  updateQuantity 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cartItems: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white border-l-4 border-black h-full flex flex-col animate-slideIn">
        <div className="p-6 border-b-4 border-black bg-[#FFFF00] flex justify-between items-center">
          <h2 className="text-3xl font-black uppercase italic transform -skew-x-12">Loadout</h2>
          <button onClick={onClose} className="border-2 border-black p-1 hover:bg-black hover:text-white transition-colors">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           {cartItems.length === 0 ? (
             <div className="text-center py-12 opacity-50 font-mono">
               <div className="text-4xl mb-4">∅</div>
               SYSTEM EMPTY.<br/>LOAD CONFIGURATION.
             </div>
           ) : (
             cartItems.map(item => (
               <div key={item.id} className="border-4 border-black p-4 brutal-shadow-sm bg-gray-50">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold font-mono text-sm leading-tight max-w-[70%]">{item.product.name}</h3>
                   <span className="font-black bg-[#FF00FF] text-white px-1 text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                 </div>
                 <div className="text-[10px] font-mono uppercase text-gray-500 mb-4">{item.product.subtitle}</div>
                 
                 <div className="flex items-center justify-between border-t-2 border-gray-200 pt-2">
                   <div className="flex items-center border-2 border-black">
                     <button 
                       onClick={() => updateQuantity(item.id, -1)}
                       className="w-8 h-8 flex items-center justify-center font-bold hover:bg-black hover:text-white transition-colors"
                     >-</button>
                     <div className="w-8 h-8 flex items-center justify-center font-mono font-bold bg-[#FFFF00] border-x-2 border-black">
                       {item.quantity}
                     </div>
                     <button 
                       onClick={() => updateQuantity(item.id, 1)}
                       className="w-8 h-8 flex items-center justify-center font-bold hover:bg-black hover:text-white transition-colors"
                     >+</button>
                   </div>
                   <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-[10px] font-bold uppercase underline hover:text-red-600">
                     Remove
                   </button>
                 </div>
               </div>
             ))
           )}
        </div>

        <div className="p-6 border-t-4 border-black bg-gray-50">
           <div className="flex justify-between font-mono font-bold text-sm mb-2">
             <span>SUBTOTAL</span>
             <span>${subtotal.toFixed(2)}</span>
           </div>
           <div className="flex justify-between font-mono text-xs text-gray-500 mb-6">
             <span>SHIPPING</span>
             <span>CALCULATED AT NEXT STEP</span>
           </div>
           <button className="w-full bg-black text-white py-4 font-black uppercase text-xl border-4 border-transparent hover:bg-[#00FFFF] hover:text-black hover:border-black transition-all">
             Initialize Checkout
           </button>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-black text-white p-12 font-mono text-xs md:text-sm">
     <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-xs">
          <div className="text-2xl font-black italic mb-4">AXIS:CORE™</div>
          <p className="text-gray-500">
            A legally compliant neuro-cosmetic entity. Not FDA evaluated because we prefer results over bureaucracy.
          </p>
        </div>
        <div className="flex gap-12">
           <ul className="space-y-2">
              <li className="font-bold text-[#FFFF00]">SITEMAP</li>
              <li className="hover:text-[#FF00FF] cursor-pointer">THE SCIENCE</li>
              <li className="hover:text-[#FF00FF] cursor-pointer">REVIEWS</li>
              <li className="hover:text-[#FF00FF] cursor-pointer">FAQ</li>
           </ul>
           <ul className="space-y-2">
              <li className="font-bold text-[#FFFF00]">LEGAL</li>
              <li className="hover:text-[#FF00FF] cursor-pointer">TERMS OF SERVICE</li>
              <li className="hover:text-[#FF00FF] cursor-pointer">PRIVACY POLICY</li>
              <li className="hover:text-[#FF00FF] cursor-pointer">REFUND POLICY</li>
           </ul>
        </div>
     </div>
     <div className="mt-12 pt-12 border-t border-gray-800 text-center text-gray-600">
        © 2025 AXIS CORE // DON'T SLEEP ON SLEEP
     </div>
  </footer>
);

// --- Product Page Component ---

const HypeProductPage = ({ 
  product, 
  onBack, 
  onAddToCart,
  onOpenCart
}: { 
  product: ProductData; 
  onBack: () => void;
  onAddToCart: (quantity: number) => void;
  onOpenCart: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'SPECS'>('DETAILS');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onOpenCart(); // Automatically open cart after adding
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white text-black font-display">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-140px)]">
        
        {/* Left: Visuals */}
        <div className="lg:col-span-7 bg-[#f0f0f0] border-b-4 lg:border-b-0 lg:border-r-4 border-black p-6 md:p-12 flex flex-col relative">
           <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              <span className="bg-[#FFFF00] border-2 border-black px-3 py-1 font-mono font-bold text-xs uppercase brutal-shadow-sm">
                 {product.sku}
              </span>
              <span className="bg-[#FF00FF] text-white border-2 border-black px-3 py-1 font-mono font-bold text-xs uppercase brutal-shadow-sm">
                 {product.tag}
              </span>
           </div>

           <div className="flex-grow flex items-center justify-center relative my-12">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 border-2 border-dashed border-gray-400 m-8 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00FFFF] rounded-full filter blur-[100px] opacity-20"></div>
              
              <img 
                src="https://picsum.photos/seed/axiscore_prod/800/800" 
                alt={product.name} 
                className="relative z-10 w-full max-w-md object-contain filter contrast-125 drop-shadow-[10px_10px_0px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-500"
              />
           </div>

           <div className="flex justify-between items-end font-mono text-xs text-gray-500 uppercase">
              <div>
                 Field_View: ISO_9001<br/>
                 Light_Source: D65
              </div>
              <div className="text-right">
                 Rotation: LOCKED<br/>
                 Zoom: DISABLED
              </div>
           </div>
        </div>

        {/* Right: Interface */}
        <div className="lg:col-span-5 bg-white p-6 md:p-12 flex flex-col">
           <div className="border-b-4 border-black pb-8 mb-8">
              <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] mb-4">
                {product.name.split('(')[0]}<br/>
                <span className="text-[#FF00FF] stroke-black">{product.name.split('(')[1]?.replace(')', '')}</span>
              </h1>
              
              <div className="flex items-baseline gap-4">
                 <span className="text-5xl font-black">${product.price.toFixed(2)}</span>
                 {product.shipping > 0 ? (
                    <span className="font-mono text-sm font-bold bg-black text-white px-2 py-1">+ ${product.shipping} SHIP</span>
                 ) : (
                    <span className="font-mono text-sm font-bold bg-[#FFFF00] border-2 border-black px-2 py-1">FREE SHIPPING</span>
                 )}
              </div>
           </div>

           {/* Description */}
           <div className="mb-8">
              <p className="font-bold text-lg mb-4">{product.description}</p>
              <ul className="space-y-2 font-mono text-sm">
                 {product.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-black"></span>
                       {item}
                    </li>
                 ))}
              </ul>
           </div>

           {/* Controls */}
           <div className="mt-auto space-y-6">
              
              {/* Quantity Glitch */}
              <div className="flex items-center border-4 border-black w-max brutal-shadow-sm">
                 <button 
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-gray-200 active:bg-black active:text-white transition-colors border-r-2 border-black"
                 >
                    -
                 </button>
                 <div className="w-16 h-12 flex items-center justify-center font-mono font-bold text-xl bg-[#FFFF00]">
                    {quantity}
                 </div>
                 <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-gray-200 active:bg-black active:text-white transition-colors border-l-2 border-black"
                 >
                    +
                 </button>
              </div>

              {/* Add to Cart */}
              <button 
                 onClick={handleAddToCart}
                 className={`w-full py-5 text-xl font-black uppercase border-4 border-black transition-all duration-100 relative overflow-hidden group ${added ? 'bg-[#00FFFF] text-black translate-x-1 translate-y-1 shadow-none' : 'bg-black text-white brutal-shadow hover:bg-[#FF00FF] hover:text-black brutal-shadow-hover'}`}
              >
                 {added ? (
                    <span className="flex items-center justify-center gap-2">
                       SECURED <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </span>
                 ) : (
                    "ADD TO LOADOUT"
                 )}
              </button>

              <div className="text-center font-mono text-xs text-gray-500 uppercase">
                 Secure Checkout // 256-Bit Encrypted // No-BS Guarantee
              </div>
           </div>
        </div>
      </main>

      {/* Accordion / Details Section */}
      <section className="border-t-4 border-black bg-[#FFFF00] p-6 md:p-12">
         <div className="max-w-4xl mx-auto bg-white border-4 border-black brutal-shadow">
            <div className="flex border-b-4 border-black">
               <button 
                  onClick={() => setActiveTab('DETAILS')}
                  className={`flex-1 py-4 font-black uppercase text-lg ${activeTab === 'DETAILS' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
               >
                  Hardware Specs
               </button>
               <button 
                  onClick={() => setActiveTab('SPECS')}
                  className={`flex-1 py-4 font-black uppercase text-lg border-l-4 border-black ${activeTab === 'SPECS' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
               >
                  Mission Protocol
               </button>
            </div>
            
            <div className="p-8 min-h-[200px]">
               {activeTab === 'DETAILS' ? (
                  <div className="space-y-4 font-mono">
                     {product.specs.details.map((spec, i) => (
                        <div key={i} className="flex justify-between border-b-2 border-gray-200 pb-2">
                           <span className="font-bold">{spec.label}</span>
                           <span>{spec.value}</span>
                        </div>
                     ))}
                     <p className="mt-4 text-sm bg-gray-100 p-4 border-l-4 border-black">
                        <strong>WARNING:</strong> Product contains 100% natural essential oils. Do not ingest. Do not use as a bath bomb (shower only).
                     </p>
                  </div>
               ) : (
                  <div className="space-y-4 font-mono">
                     <p className="font-bold uppercase">Mission Parameters:</p>
                     <ul className="list-disc pl-5 space-y-2">
                        {product.specs.mission.map((item, i) => (
                           <li key={i}>{item}</li>
                        ))}
                     </ul>
                     <p className="font-bold uppercase mt-4">Return Policy:</p>
                     <p>If it doesn't knock you out, we refund you. 30 Days. Zero hassle.</p>
                  </div>
               )}
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

// --- Home Component (Existing Content) ---

const HypeHome = ({ onBuy }: { onBuy: (id: ProductType) => void }) => {
  const scrollToOffer = () => {
    const section = document.getElementById('offer-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFF00] text-black font-display overflow-x-hidden selection:bg-black selection:text-[#FFFF00]">
      {/* 2. Hero Section */}
      <header className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-black">
        <div className="lg:col-span-8 p-8 md:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white flex flex-col justify-center">
          <div className="inline-block bg-black text-[#FFFF00] px-3 py-1 font-mono text-sm font-bold mb-6 w-max rotate-1">
            v2.0 // NEURO-PRIMER // SHOWER STEAMER
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8 break-words">
            YOUR SLEEP IS <br/>BROKEN.
          </h1>
          
          <div className="bg-[#e0e0e0] p-6 border-4 border-black max-w-xl brutal-shadow mb-8">
            <p className="font-mono text-sm md:text-base font-bold text-black uppercase leading-relaxed">
              Stop dry-swallowing melatonin. Axis Core uses high-potency terpenes in your shower to hijack your amygdala and force a shutdown.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
             <button onClick={scrollToOffer} className="bg-[#FFFF00] text-black text-xl font-black uppercase px-10 py-4 border-4 border-black brutal-shadow brutal-shadow-hover transition-all">
               Start Protocol
             </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-4 bg-[#FF00FF] relative overflow-hidden flex items-center justify-center min-h-[400px] border-b-4 lg:border-b-0 border-black">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-50"></div>
            <img src="https://picsum.photos/seed/vapor/600/800" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter contrast-150 grayscale" alt="Vapor" />
            <div className="relative z-10 bg-white border-4 border-black p-4 transform rotate-3">
               <div className="text-4xl font-black text-center">NO<br/>PILLS.</div>
            </div>
        </div>
      </header>

      {/* 2.5 Attributes / Clean Specs */}
      <div className="bg-black text-white border-b-4 border-black py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
          
          <div className="flex items-center gap-2 border-2 border-white px-4 py-2 transform -rotate-1 hover:rotate-0 transition-transform bg-[#FF00FF] text-black">
             <span className="text-2xl">🌱</span>
             <span className="font-black font-mono uppercase text-sm">100% PURE ESSENTIAL OILS</span>
          </div>

          <div className="flex items-center gap-2 border-2 border-white px-4 py-2 transform rotate-2 hover:rotate-0 transition-transform bg-[#00FFFF] text-black">
             <span className="text-2xl">🧪</span>
             <span className="font-black font-mono uppercase text-sm">NO SYNTHETIC FRAGRANCE</span>
          </div>

          <div className="flex items-center gap-2 border-2 border-white px-4 py-2 transform -rotate-2 hover:rotate-0 transition-transform bg-[#FFFF00] text-black">
             <span className="text-2xl">🐰</span>
             <span className="font-black font-mono uppercase text-sm">CRUELTY FREE & VEGAN</span>
          </div>

          <div className="flex items-center gap-2 border-2 border-white px-4 py-2 transform rotate-1 hover:rotate-0 transition-transform bg-white text-black">
             <span className="text-2xl">🚫</span>
             <span className="font-black font-mono uppercase text-sm">PARABEN & PHTHALATE FREE</span>
          </div>

        </div>
      </div>

      {/* 3. The Problem (Revised) */}
      <section className="bg-[#FFFF00] text-black p-8 md:p-20 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-black text-white px-3 py-1 font-mono text-xs font-bold mb-4">
                   DIAGNOSTIC REPORT
                </div>
                <h2 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-[0.9]">
                  THE INVISIBLE <br/><span className="bg-[#FF00FF] text-white px-2 italic">GLITCH</span>
                </h2>
                
                <div className="space-y-6 font-mono text-lg leading-relaxed border-l-4 border-black pl-6">
                  <p>
                    <strong className="bg-black text-white px-1">THE SYMPTOMS:</strong><br/>
                    Your brain won't shut off. You wake up at 3AM staring at the ceiling. Or you sleep 8 hours but wake up feeling like you haven't slept at all.
                  </p>
                  
                  <p>
                    <strong className="bg-black text-white px-1">THE REALITY:</strong><br/>
                     You might not feel "stressed." You might even love your job. But your body doesn't know the difference between "excitement" and "danger."
                  </p>
                  
                  {/* Distinct Aesthetic for The Problem */}
                  <div className="relative mt-6">
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2"></div>
                    <div className="relative bg-white border-4 border-black p-5">
                       <strong className="block bg-[#FF00FF] text-white px-2 py-1 mb-3 uppercase tracking-wider w-max border-2 border-black text-sm">
                         ⚠ THE PROBLEM IS BIOLOGICAL
                       </strong>
                       <p className="font-bold">
                         You are stuck in Sympathetic Overdrive. Think of it like a phone with 50 apps running in the background. It drains your battery silently. Until you force a "System Reboot" before bed, your sleep will remain broken.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative mt-8 md:mt-0">
                 {/* Visual Representation of the Glitch */}
                 <div className="bg-black p-1 brutal-shadow">
                    <div className="bg-white border-2 border-black p-6 space-y-4">
                       <div className="flex justify-between items-center border-b-2 border-black pb-2">
                          <span className="font-black uppercase">System Check</span>
                          <span className="font-mono text-xs text-red-600 font-bold animate-pulse">● LIVE</span>
                       </div>
                       
                       <div className="space-y-3 font-mono text-sm">
                          <div className="flex justify-between">
                             <span>Mental Activity</span>
                             <div className="w-32 bg-gray-200 h-4 border border-black overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-[#FF00FF] w-[90%] animate-pulse"></div>
                             </div>
                          </div>
                          
                          <div className="flex justify-between">
                             <span>Cortisol Level</span>
                             <div className="w-32 bg-gray-200 h-4 border border-black overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-red-500 w-[85%]"></div>
                             </div>
                          </div>

                          <div className="flex justify-between">
                             <span>Sleep Ability</span>
                             <div className="w-32 bg-gray-200 h-4 border border-black overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-black w-[10%]"></div>
                             </div>
                          </div>
                       </div>

                       <div className="bg-gray-100 p-4 border-2 border-black font-bold text-center uppercase text-xs mt-4">
                          Error: Nervous System stuck in "ON" position.
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. The Science (Expanded & Educational) */}
      <section className="bg-white py-20 px-6 border-b-4 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
             <span className="font-mono font-bold bg-[#FF00FF] text-white px-4 py-1 text-sm uppercase tracking-widest">Mechanism of Action</span>
             <h2 className="text-5xl md:text-7xl font-black uppercase mt-4 italic">Why "Nice Smells"<br/>Aren't Enough</h2>
             <p className="font-mono mt-6 max-w-2xl mx-auto text-sm md:text-base font-bold">
               Most people think aromatherapy is just air freshener. They are wrong. This is Neuro-Cosmetics: using scent molecules as biological keys to unlock specific brain states.
             </p>
          </div>

          <div className="space-y-12">
            {/* Concept 1: The Backdoor */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 border-4 border-black brutal-shadow">
               <div className="md:col-span-4 bg-black text-white p-8 flex flex-col justify-center items-center text-center border-b-4 md:border-b-0 md:border-r-4 border-white">
                 <div className="text-6xl font-black text-[#FFFF00] mb-2">01</div>
                 <h3 className="text-2xl font-bold uppercase">The Biological<br/>Backdoor</h3>
               </div>
               <div className="md:col-span-8 p-8 bg-[#FFFF00]">
                 <h4 className="font-bold text-xl uppercase mb-4 border-b-2 border-black inline-block">Bypassing The Logical Brain</h4>
                 <p className="mb-4">
                   When you ingest a pill (melatonin/magnesium), it has to survive your stomach acid and liver before reaching your blood. It's slow and inefficient.
                 </p>
                 <p className="font-bold">
                   Inhalation is instant.
                 </p>
                 <p className="mt-2 text-sm">
                   Your olfactory bulb is the ONLY part of your brain directly connected to the outside world. It has a direct hotline to the <strong className="bg-[#FF00FF] text-white px-1">Amygdala</strong> (the fear center) and <strong className="bg-[#FF00FF] text-white px-1">Hippocampus</strong> (memory). When you inhale these terpenes, you are sending a physical signal to your brain to "Safe Mode" instantly, bypassing your racing thoughts.
                 </p>
               </div>
            </div>

            {/* Concept 2: The Molecule */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 border-4 border-black brutal-shadow">
               <div className="md:col-span-4 bg-black text-white p-8 flex flex-col justify-center items-center text-center border-b-4 md:border-b-0 md:border-r-4 border-white">
                 <div className="text-6xl font-black text-[#FF00FF] mb-2">02</div>
                 <h3 className="text-2xl font-bold uppercase">Chemical<br/>Intervention</h3>
               </div>
               <div className="md:col-span-8 p-8 bg-white">
                 <h4 className="font-bold text-xl uppercase mb-4 border-b-2 border-black inline-block">Linalool vs. Cortisol</h4>
                 <p className="mb-4">
                   We use a high-concentration extract rich in <strong className="text-[#FF00FF]">Linalool</strong>. This isn't just a "rose smell." Linalool has been clinically shown to act on GABA receptors—the same receptors targeted by anti-anxiety medication.
                 </p>
                 <p className="text-sm bg-gray-100 p-4 border-l-4 border-black font-mono">
                   "It acts as a physiological brake pedal. Even if your mind wants to race, your body receives a chemical command to slow your heart rate and relax muscle tension."
                 </p>
               </div>
            </div>

            {/* Concept 3: The Anchor */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 border-4 border-black brutal-shadow">
               <div className="md:col-span-4 bg-black text-white p-8 flex flex-col justify-center items-center text-center border-b-4 md:border-b-0 md:border-r-4 border-white">
                 <div className="text-6xl font-black text-[#00FFFF] mb-2">03</div>
                 <h3 className="text-2xl font-bold uppercase">Pavlovian<br/>Conditioning</h3>
               </div>
               <div className="md:col-span-8 p-8 bg-[#f0f0f0]">
                 <h4 className="font-bold text-xl uppercase mb-4 border-b-2 border-black inline-block">Rewiring The Trigger</h4>
                 <p className="mb-4">
                   The hardest part of insomnia is the anxiety about not sleeping. Axis Core solves this via conditioning.
                 </p>
                 <p>
                   By using this unique scent profile for 7 days straight, you create a neurological anchor. Your brain learns: <br/>
                   <span className="font-black font-mono mt-2 block">SCENT + STEAM = SHUTDOWN.</span>
                 </p>
                 <p className="mt-2 text-sm">
                   Eventually, the smell alone triggers sleepiness, even on your most stressful days.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Usage Protocol (Corrected Timing) */}
      <section className="bg-[#FF00FF] py-16 px-4 border-b-4 border-black">
         <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
               <h2 className="text-4xl md:text-6xl font-black uppercase text-white text-center drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                 Protocol Execution
               </h2>
               <div className="bg-black text-[#FFFF00] font-mono font-bold px-6 py-2 mt-4 transform rotate-1 border-2 border-white">
                 TOTAL RITUAL TIME: 10 MINUTE SHOWER
               </div>
               <div className="text-white font-mono text-sm mt-2 font-bold uppercase">
                 Execute 60-90 Mins Before Sleep
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
               {/* Step 1 */}
               <div className="bg-white border-4 border-black p-4 brutal-shadow transform hover:-translate-y-2 transition-transform">
                  <div className="text-4xl font-black mb-2 text-[#FF00FF]">01</div>
                  <h4 className="font-bold uppercase text-lg border-b-2 border-black mb-2">Shower On</h4>
                  <p className="font-mono text-xs leading-tight">Turn on hot water. Enter shower. Let steam build up around you.</p>
               </div>
               
               {/* Step 2 */}
               <div className="bg-[#FFFF00] border-4 border-black p-4 brutal-shadow transform hover:-translate-y-2 transition-transform md:-rotate-2 z-10">
                  <div className="flex justify-between items-start">
                    <div className="text-4xl font-black mb-2">02</div>
                    <span className="bg-red-600 text-white text-[10px] font-bold px-1 animate-pulse">CRITICAL</span>
                  </div>
                  <h4 className="font-bold uppercase text-lg border-b-2 border-black mb-2">Placement</h4>
                  <p className="font-mono text-xs font-bold leading-tight">Place on floor away from direct stream. Gentle splashes only.</p>
               </div>

               {/* Step 3 */}
               <div className="bg-white border-4 border-black p-4 brutal-shadow transform hover:-translate-y-2 transition-transform">
                  <div className="text-4xl font-black mb-2 text-[#FF00FF]">03</div>
                  <h4 className="font-bold uppercase text-lg border-b-2 border-black mb-2">Activate</h4>
                  <p className="font-mono text-xs leading-tight">Splash a tiny bit of water on tablet to release the Neuro-Primers.</p>
               </div>

               {/* Step 4 */}
               <div className="bg-white border-4 border-black p-4 brutal-shadow transform hover:-translate-y-2 transition-transform">
                  <div className="text-4xl font-black mb-2 text-[#FF00FF]">04</div>
                  <h4 className="font-bold uppercase text-lg border-b-2 border-black mb-2">Shower</h4>
                  <p className="font-mono text-xs leading-tight">Shower normally. Be mindful of the scent filling the room as you wash.</p>
               </div>

               {/* Step 5 */}
               <div className="bg-white border-4 border-black p-4 brutal-shadow transform hover:-translate-y-2 transition-transform">
                  <div className="text-4xl font-black mb-2 text-[#FF00FF]">05</div>
                  <h4 className="font-bold uppercase text-lg border-b-2 border-black mb-2">Exit</h4>
                  <p className="font-mono text-xs leading-tight">Rinse residue. Dry off. Body temp drops = Biological Sleep Signal.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 6. The Offer (Pricing) */}
      <section id="offer-section" className="bg-[#e5e5e5] py-20 px-4 md:px-8 border-b-4 border-black relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-12 bg-white border-4 border-black inline-block px-8 py-2 transform -rotate-2 mx-auto w-full md:w-auto">
            Choose Your Loadout
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            
            {/* Card 1: The Hook */}
            <div className="bg-white border-4 border-black p-8 relative grayscale hover:grayscale-0 transition-all duration-300">
               <h3 className="font-mono text-xl font-bold text-gray-500 mb-2">{PRODUCTS.HOOK.name}</h3>
               <div className="text-5xl font-black mb-4">${PRODUCTS.HOOK.price.toFixed(2)}</div>
               <div className="text-sm font-mono border-b-2 border-black pb-4 mb-4">
                 + ${PRODUCTS.HOOK.shipping} SHIPPING
               </div>
               <ul className="space-y-3 font-bold mb-8 text-sm">
                 <li className="flex items-center gap-2">
                   <span className="w-4 h-4 bg-black"></span> 1 PACK (7 PILLS)
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-4 h-4 bg-black"></span> VALIDATE PROTOCOL
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-4 h-4 bg-black"></span> $2.70 PER DOSE
                 </li>
               </ul>
               <button 
                  onClick={() => onBuy('HOOK')}
                  className="w-full border-4 border-black py-4 font-black uppercase hover:bg-gray-200 transition-colors"
               >
                 Try It Once
               </button>
            </div>

            {/* Card 2: The Habit */}
            <div className="bg-[#FFFF00] border-4 border-black p-8 relative transform md:scale-110 brutal-shadow">
               <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#FF00FF] text-white border-4 border-black px-4 py-1 font-black uppercase text-sm whitespace-nowrap">
                 Best Value
               </div>
               <h3 className="font-mono text-xl font-bold text-black mb-2">{PRODUCTS.HABIT.name}</h3>
               <div className="text-6xl font-black mb-4">${PRODUCTS.HABIT.price.toFixed(2)}</div>
               <div className="text-sm font-mono border-b-2 border-black pb-4 mb-4 font-bold">
                 FREE SHIPPING // MONTHLY
               </div>
               <ul className="space-y-3 font-bold mb-8">
                 <li className="flex items-center gap-2">
                   <span className="w-4 h-4 bg-[#FF00FF] border-2 border-black"></span> 4 PACKS (28 PILLS)
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-4 h-4 bg-[#FF00FF] border-2 border-black"></span> FULL SLEEP HYGIENE
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-4 h-4 bg-[#FF00FF] border-2 border-black"></span> $2.10 PER DOSE (SAVE 40%)
                 </li>
               </ul>
               <button 
                  onClick={() => onBuy('HABIT')}
                  className="w-full bg-black text-white border-4 border-transparent hover:border-white py-4 font-black uppercase text-xl hover:bg-[#FF00FF] hover:text-black transition-colors"
               >
                 Start Subscription
               </button>
               <div className="text-center mt-4 text-xs font-bold uppercase tracking-widest text-black">
                  Cancel anytime. No questions asked.
               </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- Main Layout Controller ---

export const HypeLayout: React.FC = () => {
  const [view, setView] = useState<'HOME' | 'PRODUCT'>('HOME');
  const [selectedProductId, setSelectedProductId] = useState<ProductType>('HOOK');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleBuy = (id: ProductType) => {
    setSelectedProductId(id);
    setView('PRODUCT');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('HOME');
    window.scrollTo(0, 0);
  };

  const addToCart = (quantity: number) => {
     setCart(prev => {
        const existing = prev.find(item => item.productId === selectedProductId);
        if (existing) {
           return prev.map(item => 
              item.productId === selectedProductId 
              ? { ...item, quantity: item.quantity + quantity }
              : item
           );
        }
        return [...prev, { 
           id: `${selectedProductId}-${Date.now()}`, 
           productId: selectedProductId, 
           quantity,
           product: PRODUCTS[selectedProductId]
        }];
     });
  };

  const updateQuantity = (id: string, delta: number) => {
     setCart(prev => prev.map(item => {
        if (item.id === id) {
           const newQty = item.quantity + delta;
           return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
     }).filter(item => {
        // Remove item if delta was negative large number (remove button)
        return item.quantity > 0 || delta > -100; // Keep logic simple, if qty 0 remove?
     }).filter(item => {
        if (delta < -10 && item.id === id) return false; // Explicit remove
        return true;
     }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <MarqueeBar />
      <Navbar 
         onBack={view === 'PRODUCT' ? handleBack : undefined} 
         showBack={view === 'PRODUCT'} 
         cartCount={cartCount}
         onOpenCart={() => setIsCartOpen(true)}
      />
      
      {view === 'HOME' ? (
        <HypeHome onBuy={handleBuy} />
      ) : (
        <HypeProductPage 
           product={PRODUCTS[selectedProductId]} 
           onBack={handleBack} 
           onAddToCart={addToCart}
           onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      <CartDrawer 
         isOpen={isCartOpen} 
         onClose={() => setIsCartOpen(false)} 
         cartItems={cart}
         updateQuantity={updateQuantity}
      />
    </>
  );
};