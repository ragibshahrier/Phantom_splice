import React, { useCallback, useState, useRef } from 'react';
import { RitualState } from '../types';
import { soundService } from '../services/soundService';

interface ThePortalProps {
  onFileSelected: (file: File) => void;
  state: RitualState;
}

const ThePortal: React.FC<ThePortalProps> = ({ onFileSelected, state }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state === RitualState.IDLE || state === RitualState.FAILED) {
      if (!isDragOver) {
        soundService.playDragHover();
      }
      setIsDragOver(true);
    }
  }, [state, isDragOver]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (state !== RitualState.IDLE && state !== RitualState.FAILED) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        soundService.playDrop();
        onFileSelected(file);
      } else {
        soundService.playFailure();
      }
    }
  }, [onFileSelected, state]);

  const handleClick = () => {
    if (state === RitualState.IDLE || state === RitualState.FAILED) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      soundService.playDrop();
      onFileSelected(e.target.files[0]);
    }
  };

  const isSummoning = isDragOver;
  const isProcessing = state === RitualState.SEVERING;
  
  // Dynamic Styles
  const pulseSpeed = isSummoning || isProcessing ? 'duration-150' : 'duration-[2000ms]';
  const scale = isSummoning ? 'scale-110' : 'scale-100';
  
  // Heartbeat animation via inline style for variability
  const heartbeatStyle = (isSummoning || isProcessing) 
    ? { animation: 'blob-pulse 0.4s ease-in-out infinite alternate' } 
    : { animation: 'blob-pulse 3s ease-in-out infinite alternate' };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden"
      />

      {/* Main Wound/Portal Container */}
      <div 
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative w-[280px] h-[280px]
          flex items-center justify-center cursor-pointer
          transition-all ease-out
          ${scale}
        `}
      >
        {/* 1. The Outer Toxic Glow */}
        <div 
           className="absolute inset-0 blur-[60px] rounded-full transition-opacity duration-300"
           style={{ 
             opacity: isSummoning ? 0.8 : 0.3,
             background: 'radial-gradient(circle, rgba(0, 255, 65, 0.3) 0%, transparent 70%)'
           }}
        ></div>

        {/* 2. The Pulsing Biohazard Portal */}
        <div 
          className={`
            absolute inset-0 border-4
            transition-colors duration-300
            ${isSummoning ? 'border-[#00ff41] bg-[#0d2818]/30' : 'border-[#00ff41]/40 bg-black/40'}
            ${isProcessing ? 'border-[#39ff14] bg-[#0d2818]/60' : ''}
          `}
          style={{
             boxShadow: isSummoning ? '0 0 50px rgba(0, 255, 65, 0.6), inset 0 0 30px rgba(0, 255, 65, 0.3)' : '0 0 20px rgba(0, 255, 65, 0.3)',
             ...heartbeatStyle
          }}
        ></div>

        {/* 3. Inner Vortex Layers (Rotating) */}
        <div className={`absolute inset-6 opacity-60 rounded-full border border-dashed border-[#00ff41]/50 animate-spin-slow duration-[10s]`} style={{ boxShadow: '0 0 10px rgba(0, 255, 65, 0.2)' }}></div>
        <div className={`absolute inset-12 opacity-40 rounded-full border-2 border-dotted border-[#00ff41]/40 animate-spin-reverse duration-[15s]`}></div>
        
        {/* 4. The Void Center */}
        <div 
           className={`
             absolute w-40 h-40 rounded-full bg-black flex items-center justify-center transition-all duration-300
             ${isSummoning ? 'scale-125' : 'scale-100'}
           `}
           style={{
             boxShadow: isSummoning ? 'inset 0 0 40px rgba(0, 255, 65, 0.3)' : 'inset 0 0 40px rgba(0, 0, 0, 1)'
           }}
        >
          {isProcessing ? (
             <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 border-t-4 border-[#00ff41] rounded-full animate-spin" style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.6)' }}></div>
                <span className="font-mono-tech text-[#00ff41] animate-pulse text-xs tracking-widest" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.8)' }}>EXTRACTING</span>
             </div>
          ) : (
            <div className={`transition-all duration-300 ${isSummoning ? 'text-[#00ff41] scale-110' : 'text-[#00ff41]/40'}`} style={{ filter: isSummoning ? 'drop-shadow(0 0 10px rgba(0, 255, 65, 0.8))' : 'none' }}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                 <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
               </svg>
            </div>
          )}
        </div>

        {/* 5. Text Overlay - Float underneath */}
        <div className="absolute -bottom-16 text-center pointer-events-none">
          <h2 className={`text-lg font-cinzel font-bold tracking-[0.2em] transition-colors duration-300 ${isSummoning ? 'text-[#00ff41]' : 'text-[#00ff41]/50'}`} style={{ textShadow: isSummoning ? '0 0 15px rgba(0, 255, 65, 0.8)' : 'none' }}>
            {isSummoning ? "INSERT SPECIMEN" : "ACTIVATE PORTAL"}
          </h2>
          <p className="font-mono-tech text-[9px] text-[#00ff41]/40 mt-1 uppercase animate-pulse">
            {isSummoning ? "RELEASE TO PROCESS" : "CLICK OR DRAG"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ThePortal;