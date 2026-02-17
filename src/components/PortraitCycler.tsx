import { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface PortraitCyclerProps {
  images: string[];
  className?: string;
  interactive?: boolean;
}

export default function PortraitCycler({ images, className = "", interactive = true }: PortraitCyclerProps) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastIndex = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || images.length <= 1 || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Calculate index based on mouse X position
    const newIndex = Math.floor((x / width) * images.length);
    const clampedIndex = Math.max(0, Math.min(newIndex, images.length - 1));

    if (clampedIndex !== lastIndex.current) {
      setIndex(clampedIndex);
      lastIndex.current = clampedIndex;
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden bg-gray-900 border-4 border-black cursor-crosshair group ${className}`}
    >
      
      {/* 1. ФОНОВЫЙ NO SIGNAL */}
      <div className="absolute inset-0 flex items-center justify-center text-xs font-mono uppercase p-4 text-center text-gray-600 z-0">
        NO SIGNAL
      </div>

      {/* 2. КАРТИНКИ */}
      <div className="absolute inset-0 z-10">
        <img
          src={images[index]}
          alt="Portrait"
          className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90 group-hover:brightness-110 transition-all duration-75"
        />
      </div>

      {/* 3. ШУМ (Поверх всего) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      
      {/* 4. ИНДИКАТОР (как на сайте Руслана POS: X/Y) */}
      <div className="absolute bottom-2 right-2 z-30 bg-black text-white text-[10px] font-mono px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        POS: {index + 1}/{images.length}
      </div>

      {/* 5. ЭФФЕКТ СКАНИРОВАНИЯ (CRT LINE) */}
      <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden opacity-10">
        <div className="w-full h-[2px] bg-white animate-scanline"></div>
      </div>
    </div>
  );
}
