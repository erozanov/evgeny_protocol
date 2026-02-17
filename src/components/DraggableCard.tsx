import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DraggableCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  dragConstraints?: any;
  noPadding?: boolean; // Новый проп для фото без отступов
  style?: React.CSSProperties;
}

export default function DraggableCard({ children, title, className, dragConstraints, noPadding = false, style }: DraggableCardProps) {
  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      whileHover={{ scale: 1.02, zIndex: 40 }}
      style={style}
      className={twMerge(
        `absolute border-4 border-black bg-white shadow-brutal cursor-grab active:cursor-grabbing text-black overflow-hidden flex flex-col`,
        !noPadding && 'p-4',
        className
      )}
    >
      {title && (
        <h3 className={twMerge(
          "font-bold uppercase border-black select-none font-mono bg-white z-10 relative flex-shrink-0",
          !noPadding ? "mb-2 border-b-2 pb-1" : "absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs border-r-2 border-b-2"
        )}>
          {title}
        </h3>
      )}
      
      <div className={twMerge(
        "select-none font-mono flex-grow relative",
        !noPadding && "prose-sm"
      )}>
        {children}
      </div>
    </motion.div>
  );
}
