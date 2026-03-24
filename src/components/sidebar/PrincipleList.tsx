import React from 'react';
import { Principle } from '../../constants/principles';
import { PrincipleItem } from './PrincipleItem';

export type PrincipleListProps = {
  principles: Record<number, Principle>;
  playingId: string | null;
};

export const PrincipleList: React.FC<PrincipleListProps> = ({ principles, playingId }) => {
  const items = [];
  for (let i = 1; i <= 12; i++) {
    const p = principles[i];
    if (p) {
      items.push(
        <PrincipleItem 
          key={p.id} 
          principle={p} 
          isPlaying={playingId === p.id} 
        />
      );
    }
  }

  return (
    <div className="p-4 flex-1 flex flex-col gap-1">
      {items}
    </div>
  );
};
