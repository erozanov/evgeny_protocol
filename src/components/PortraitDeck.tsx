import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

interface PortraitDeckProps {
  images: string[];
  className?: string;
}

export default function PortraitDeck({ images, className = "" }: PortraitDeckProps) {
  // We keep the deck order in state.
  // The LAST element is visually on top.
  const [cards, setCards] = useState(images);

  const handleDragEnd = (draggedIndex: number, info: any) => {
    // If dragged far enough (thrown), move to bottom of stack
    const threshold = 100;
    const distance = Math.hypot(info.offset.x, info.offset.y);

    if (distance > threshold) {
      // Move card from end (top) to start (bottom)
      setCards((prev) => {
        const newCards = [...prev];
        const [moved] = newCards.splice(draggedIndex, 1); // remove top card
        newCards.unshift(moved); // add to bottom
        return newCards;
      });
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {cards.map((src, index) => {
        const isTop = index === cards.length - 1;
        // Calculate a slight random rotation based on index/src hash to keep it consistent but messy
        const rotation = (index % 2 === 0 ? 1 : -1) * ((index * 3) % 5); 
        
        return (
          <Card
            key={src}
            src={src}
            index={index}
            isTop={isTop}
            rotation={rotation}
            onDragEnd={(info) => handleDragEnd(index, info)}
          />
        );
      })}
       {/* Background placeholder if stack is empty or loading */}
       <div className="absolute inset-0 flex items-center justify-center -z-10 border-4 border-black bg-gray-100">
        <span className="font-mono font-bold uppercase text-gray-400">LOADING...</span>
      </div>
    </div>
  );
}

function Card({ src, index, isTop, rotation, onDragEnd }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Rotate slightly as you drag
  const rotateDrag = useTransform(x, [-200, 200], [-15, 15]);

  return (
    <motion.div
      drag={isTop} // Only draggable if on top
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Snap back if not thrown
      dragElastic={0.6} // Rubber band effect
      style={{
        zIndex: index,
        x,
        y,
        rotate: isTop ? rotateDrag : rotation, // Use dynamic rotation when dragging, static otherwise
        scale: isTop ? 1 : 0.95 + (index * 0.01), // Slight depth scale
      }}
      whileHover={{ scale: isTop ? 1.05 : 1, cursor: isTop ? 'grab' : 'default' }}
      whileTap={{ cursor: isTop ? 'grabbing' : 'default', scale: 1.1 }}
      onDragEnd={(_, info) => onDragEnd(info)}
      className="absolute inset-0 bg-white border-4 border-black shadow-brutal select-none"
    >
      <div className="relative w-full h-full p-2 bg-white flex flex-col">
          <div className="flex-grow relative overflow-hidden border-b-2 border-black mb-2">
            <img 
                src={src} 
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 pointer-events-none" 
                draggable="false"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono uppercase font-bold tracking-tighter">
              <span>IMG_0{index + 1}</span>
              <span>{isTop ? 'DRAG ME ->' : 'LOCKED'}</span>
          </div>
      </div>
    </motion.div>
  );
}
