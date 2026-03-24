import React from 'react';
import { Play, Square } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';

export type PlayStopButtonProps = {
  isPlaying: boolean;
  onClick: (e: React.MouseEvent) => void;
};

export const PlayStopButton: React.FC<PlayStopButtonProps> = ({ isPlaying, onClick }) => {
  return (
    <ActionButton
      onClick={onClick}
      className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
        isPlaying ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/50'
      }`}
      title={isPlaying ? "Stop Animation" : "Play Animation"}
      whileTap={{ scale: 0.9 }}
    >
      {isPlaying ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
    </ActionButton>
  );
};
