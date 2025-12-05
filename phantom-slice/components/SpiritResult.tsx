import React from 'react';
import { ProcessedImage } from '../types';

interface SpiritResultProps {
  data: ProcessedImage;
  onReset: () => void;
}

const SpiritResult: React.FC<SpiritResultProps> = ({ data, onReset }) => {
  const handleDownload = () => {
    if (data.processedUrl) {
      const link = document.createElement('a');
      link.href = data.processedUrl;
      link.download = 'phantom_severed.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 animate-[fadeIn_1s_ease-out] px-3 py-2">
      
      {/* Result Grid - Side by Side */}
      <div className="flex flex-row gap-3 justify-center items-start" style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
        
        {/* Source Card */}
        <div className="relative group border-2 border-[#00ff41]/40 bg-black p-1.5 w-[170px]" style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.8)' }}>
           <div className="absolute top-0 left-0 px-1 py-0.5 bg-[#0d2818]/60 text-[#00ff41] font-mono-tech text-[7px] tracking-widest z-10 border-r border-b border-[#00ff41]/30" style={{ textShadow: '0 0 5px rgba(0, 255, 65, 0.5)' }}>
             INPUT
           </div>
           
           <div className="relative w-full h-[140px] flex items-center justify-center bg-[#000000] overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at center, #0a0f0a 0%, #000000 100%)' }}>
             <img 
               src={data.originalUrl} 
               alt="Original" 
               style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
               className="object-contain opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
             />
             {/* Scanline overlay specific to image */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,20,10,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(0,255,65,0.06),rgba(0,0,0,0.02),rgba(0,255,65,0.04))] bg-[length:100%_4px,6px_100%] pointer-events-none"></div>
           </div>
        </div>

        {/* Result Card */}
        <div className="relative group border-2 border-[#00ff41]/70 bg-black p-1.5 w-[170px]" style={{ boxShadow: '0 0 35px rgba(0, 255, 65, 0.25), inset 0 0 15px rgba(0, 255, 65, 0.05)' }}>
           <div className="absolute top-0 left-0 px-1 py-0.5 bg-[#00ff41] text-black font-mono-tech text-[7px] font-bold tracking-widest z-10" style={{ boxShadow: '0 0 10px rgba(0, 255, 65, 0.6)' }}>
             EXTRACTED
           </div>
           
           <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(circle at center, #0d2818 0%, #000 100%)' }}>
             <div className="absolute inset-0 opacity-15" style={{ 
                 backgroundImage: 'linear-gradient(45deg, #00ff41 25%, transparent 25%), linear-gradient(-45deg, #00ff41 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #00ff41 75%), linear-gradient(-45deg, transparent 75%, #00ff41 75%)',
                 backgroundSize: '20px 20px'
             }}></div>

             {data.processedUrl && (
               <img 
                 src={data.processedUrl} 
                 alt="Processed" 
                 style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.6))' }}
                 className="relative z-10 object-contain" 
               />
             )}
           </div>
        </div>

      </div>

      {/* Analysis Log */}
      {data.spiritReading && (
         <div className="border-2 border-[#00ff41]/50 bg-black/95 p-4 relative overflow-hidden group" style={{ boxShadow: '0 0 25px rgba(0, 255, 65, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.8)' }}>
           <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff41]" style={{ boxShadow: '0 0 10px rgba(0, 255, 65, 0.6)' }}></div>
           <h4 className="font-mono-tech text-[#00ff41] text-[9px] mb-2 uppercase tracking-[0.2em] flex items-center gap-1" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}>
             <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse" style={{ boxShadow: '0 0 5px rgba(0, 255, 65, 0.8)' }}></span>
             ANALYSIS
           </h4>
           <p className="font-cinzel text-xs text-[#e8ffe8] italic leading-relaxed">
             "{data.spiritReading}"
           </p>
         </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-3 mb-3">
        <button 
          onClick={onReset}
          className="font-mono-tech text-[#00ff41]/70 hover:text-[#00ff41] tracking-widest text-[11px] py-2.5 px-5 border-2 border-[#00ff41]/30 hover:border-[#00ff41]/60 bg-black/60 hover:bg-black/80 transition-all relative overflow-hidden group"
          style={{ 
            textShadow: '0 0 8px rgba(0, 255, 65, 0.4)',
            boxShadow: '0 0 10px rgba(0, 255, 65, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          <span className="relative z-10">⟲ DISCARD</span>
          <div className="absolute inset-0 bg-[#00ff41] opacity-0 group-hover:opacity-5 transition-opacity"></div>
        </button>

        <button 
          onClick={handleDownload}
          className="relative group bg-[#0d2818]/60 hover:bg-[#0d2818]/80 border-2 border-[#00ff41] text-[#00ff41] hover:text-[#39ff14] font-mono-tech tracking-widest py-2.5 px-6 transition-all overflow-hidden text-[11px]"
          style={{ 
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 15px rgba(0, 255, 65, 0.1)',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.6)'
          }}
        >
          <span className="relative z-10 flex items-center gap-2 font-bold">
            ⬇ DOWNLOAD
          </span>
          <div className="absolute inset-0 bg-[#00ff41] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-15"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: 'inset 0 0 20px rgba(0, 255, 65, 0.3)' }}></div>
        </button>
      </div>

    </div>
  );
};

export default SpiritResult;