import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';

export type TaskItemProps = {
  task: string;
  index: number;
  isLiked: boolean;
  onLike: () => void;
  isHoverEnabled: boolean;
  isLikeAnimEnabled: boolean;
  setRef: (el: HTMLElement | null) => void;
  setLikeRef: (el: HTMLButtonElement | null) => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, index, isLiked, onLike, isHoverEnabled, isLikeAnimEnabled, setRef, setLikeRef 
}) => {
  return (
    <motion.div 
      ref={setRef}
      whileHover={isHoverEnabled ? "hover" : "hoverDisabled"}
      initial="rest"
      className="relative p-4 flex items-center justify-between cursor-pointer bg-white dark:bg-slate-800"
    >
      <motion.div 
        variants={{
          rest: { x: 0 },
          hover: { x: [0, -5, 10], transition: { duration: 0.3 } },
          hoverDisabled: { x: 10, transition: { duration: 0.01 } }
        }}
        className="flex items-center gap-3"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{task}</span>
      </motion.div>
      
      <ActionButton
        ref={setLikeRef}
        onClick={(e) => { e.stopPropagation(); onLike(); }}
        whileTap={isLikeAnimEnabled ? { scale: 0.8 } : {}}
        className={`relative p-2 rounded-full ${isLiked ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-slate-300 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
      >
        <motion.div
          animate={isLiked && isLikeAnimEnabled ? { 
            scale: [1, 1.5, 1],
            rotate: [0, -10, 10, 0]
          } : {}}
          transition={{ duration: 0.4 }}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </motion.div>
      </ActionButton>
    </motion.div>
  );
};
