import React from 'react';
import { Principle } from '../../constants/principles';
import { PlayStopButton } from './PlayStopButton';

export type PrincipleItemProps = {
  principle: Principle;
  isPlaying: boolean;
};

export const PrincipleItem: React.FC<PrincipleItemProps> = ({ principle, isPlaying }) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg group">
      <div className="flex-1 pr-4">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{principle.name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{principle.description}</p>
      </div>
      <PlayStopButton 
        isPlaying={isPlaying} 
        onClick={(e) => principle.action(!isPlaying, e)} 
      />
    </div>
  );
};
