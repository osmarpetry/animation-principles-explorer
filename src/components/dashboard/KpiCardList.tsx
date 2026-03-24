import React from 'react';
import { motion } from 'motion/react';
import { KpiCard } from './KpiCard';

export type KpiCardListProps = {
  data: { label: string; value: number }[];
  isStaggerEnabled: boolean;
  isHoverEnabled: boolean;
  setRef: (index: number, el: HTMLElement | null) => void;
};

export const KpiCardList: React.FC<KpiCardListProps> = ({ data, isStaggerEnabled, isHoverEnabled, setRef }) => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { staggerChildren: isStaggerEnabled ? 0.1 : 0 } 
        }
      }}
      className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
    >
      {data.map((item, i) => (
        <KpiCard 
          key={i}
          index={i}
          label={item.label}
          value={item.value}
          isHoverEnabled={isHoverEnabled}
          setRef={(el) => setRef(i, el)}
        />
      ))}
    </motion.div>
  );
};
