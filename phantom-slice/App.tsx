import React, { useState, useEffect, useRef } from 'react';
import ThePortal from './components/ThePortal';
import SpiritResult from './components/SpiritResult';
import { RitualState, ProcessedImage, BackendConfig } from './types';
import { severSpirit, getSpiritReading } from './services/spiritService';
import { soundService } from './services/soundService';
import { resizeImage, validateImage } from './utils/imageUtils';

const Oscilloscope = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get the actual container dimensions
    const container = canvas.parentElement;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width || 600;
      canvas.height = rect.height || 600;
      return { width: canvas.width, height: canvas.height };
    };

    let { width, height } = updateSize();

    const resize = () => {
      const newSize = updateSize();
      width = newSize.width;
      height = newSize.height;
    };
    window.addEventListener('resize', resize);

    let t = 0;
    
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 0, 0, 0.1)'; // Slow fade trail
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00ff41';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00ff41';
      
      ctx.beginPath();
      
      const centerY = height / 2;
      const amplitude = 30; // Reduced for smaller popup
      
      // Draw a "heartbeat" / glitch line
      for (let x = 0; x < width; x+=5) {
        // Random glitch spikes
        const glitch = Math.random() > 0.98 ? (Math.random() - 0.5) * 150 : 0;
        
        // Sine wave base
        const y = centerY + Math.sin(x * 0.01 + t) * amplitude 
                  + (Math.random() - 0.5) * 10 // constant noise
                  + glitch;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      t += 0.1;
      requestAnimationFrame(draw);
    };
    
    const animId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

const BloodRain = () => {
  // Create an array of random drips
  const drips = Array.from({ length: 20 }).map((_, i) => ({
    left: `${Math.random() * 100}vw`,
    delay: `${Math.random() * 5}s`,
    duration: `${1 + Math.random() * 2}s`
  }));

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[2]" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {drips.map((drip, i) => (
        <div 
          key={i} 
          className="blood-drip"
          style={{ 
            position: 'absolute',
            left: drip.left, 
            animationDelay: drip.delay,
            animationDuration: drip.duration
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<RitualState>(RitualState.IDLE);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [config, setConfig] = useState<BackendConfig>({
    useMock: false,
    serverUrl: 'http://localhost:5000/sever'
  });
  
  const handleFileSelected = async (file: File) => {
    // Validate image first
    const validation = validateImage(file);
    if (!validation.valid) {
      console.error('Validation failed:', validation.error);
      setState(RitualState.FAILED);
      soundService.playFailure();
      alert(validation.error || 'Invalid image file');
      setTimeout(() => setState(RitualState.IDLE), 2000);
      return;
    }

    setState(RitualState.SEVERING);
    
    try {
      // Resize image if needed (limits to 1920x1920)
      const resizedFile = await resizeImage(file);
      
      const originalUrl = URL.createObjectURL(resizedFile);
      const blob = await severSpirit(resizedFile, config);
      const processedUrl = URL.createObjectURL(blob);
      
      // Start reading concurrently
      const readingPromise = getSpiritReading(resizedFile);
      const reading = await readingPromise;

      setResult({
        originalUrl,
        processedUrl,
        spiritReading: reading
      });
      
      setState(RitualState.COMPLETE);
      soundService.playSuccess();

    } catch (error) {
      console.error(error);
      setState(RitualState.FAILED);
      soundService.playFailure();
      setTimeout(() => setState(RitualState.IDLE), 3000);
    }
  };

  const handleReset = () => {
    if (result) {
      URL.revokeObjectURL(result.originalUrl);
      if (result.processedUrl) URL.revokeObjectURL(result.processedUrl);
    }
    setResult(null);
    setState(RitualState.IDLE);
  };

  const toggleMockMode = () => {
    setConfig(prev => ({ ...prev, useMock: !prev.useMock }));
  };

  const toggleMute = () => {
    soundService.toggleMute();
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full h-full relative bg-black" style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'radial-gradient(circle at center, #0a0f0a 0%, #000000 100%)', padding: '12px', boxSizing: 'border-box' }}>
      
      {/* --- BACKGROUND LAYERS (FULL COVERAGE) --- */}
      <div className="absolute inset-0 w-full h-full" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Oscilloscope />
        <BloodRain />
        
        {/* Toxic Vignette */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 20, 10, 0.8) 80%, #000 100%)' }}></div>

        {/* CRT Scanlines (Scrolls) */}
        <div className="scanlines" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
        
        {/* Noise Grain */}
        <div className="noise" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
      </div>

      {/* --- MAIN UI --- */}
      <div className="relative z-20 w-full h-full flex flex-col items-center overflow-hidden" style={{ position: 'relative', borderRadius: '8px', border: '2px solid rgba(0, 255, 65, 0.2)', boxShadow: '0 0 30px rgba(0, 255, 65, 0.15), inset 0 0 50px rgba(0, 0, 0, 0.8)', padding: '16px', boxSizing: 'border-box' }}>
        
        {/* Header with Glitch Effect */}
        <header className="mb-6 mt-3 text-center relative group select-none w-full">
          <div className="relative inline-block">
            <h1 
              className="text-3xl font-cinzel font-black tracking-tighter text-[#00ff41] glitch"
              style={{ textShadow: '0 0 20px rgba(0, 255, 65, 0.8), 0 0 40px rgba(0, 255, 65, 0.4)' }}
              data-text="PHANTOM CROP"
            >
              PHANTOM CROP
            </h1>
          </div>
          
          <div className="mt-2 flex flex-col items-center space-y-1">
             <div className="h-[1px] w-full max-w-[150px] bg-[#00ff41] animate-pulse" style={{ boxShadow: '0 0 10px rgba(0, 255, 65, 0.6)' }}></div>
             <p className="font-mono-tech text-[#00ff41] text-[10px] tracking-[0.3em] uppercase animate-pulse" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}>
               BIOHAZARD: DETECTED
             </p>
          </div>
        </header>

        {/* Configuration Toggle */}
        <div className="absolute top-3 right-3 z-50">
           <button
             onClick={toggleMute}
             className={`font-mono-tech text-[10px] px-3 py-1.5 border-2 backdrop-blur-sm transition-all relative overflow-hidden group ${
               isMuted 
                 ? 'border-red-500/60 bg-red-950/40 text-red-400 hover:border-red-500' 
                 : 'border-[#00ff41]/50 bg-black/90 text-[#00ff41] hover:text-[#39ff14] hover:border-[#00ff41]'
             }`}
             style={{ 
               boxShadow: isMuted 
                 ? '0 0 15px rgba(255, 0, 0, 0.3), inset 0 0 10px rgba(255, 0, 0, 0.1)' 
                 : '0 0 15px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.1)' 
             }}
           >
             <span className="relative z-10 tracking-wider" style={{ 
               textShadow: isMuted 
                 ? '0 0 8px rgba(255, 0, 0, 0.6)' 
                 : '0 0 8px rgba(0, 255, 65, 0.6)' 
             }}>
               {isMuted ? '🔇 MUTED' : '🔊 SOUND'}
             </span>
             <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${
               isMuted ? 'bg-red-500' : 'bg-[#00ff41]'
             }`}></div>
           </button>
        </div>

        {/* Content Area */}
        <main className="flex-grow w-full flex items-center justify-center">
          
          {state === RitualState.COMPLETE && result ? (
            <SpiritResult data={result} onReset={handleReset} />
          ) : (
            <ThePortal 
              onFileSelected={handleFileSelected} 
              state={state} 
            />
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="w-full text-center z-20 pointer-events-none py-3">
        <p className="text-[#00ff41]/40 text-[9px] font-mono-tech tracking-widest uppercase animate-pulse">
          ☢ Awaiting Specimen...
        </p>
      </footer>

    </div>
  );
};

export default App;