import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export type KpiCardProps = {
  label: string;
  value: number;
  index: number;
  isHoverEnabled: boolean;
  setRef: (el: HTMLElement | null) => void;
};

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, index, isHoverEnabled, setRef }) => {
  return (
    <motion.div 
      ref={setRef}
      variants={{
        hidden: { y: isHoverEnabled ? 20 : 0, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
      }}
      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
    >
      <motion.div
        variants={{
          rest: { scale: 1, y: 0 },
          hover: isHoverEnabled ? { scale: 1.05, y: -5 } : { scale: 1 }
        }}
        whileHover={isHoverEnabled ? "hover" : undefined}
        className="h-full w-full"
      >
        <div className="w-8 h-8 bg-indigo-50 rounded-lg mb-3 flex items-center justify-center text-indigo-600">
          <Activity size={16} />
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value.toLocaleString()}</p>
      </motion.div>
    </motion.div>
  );
};
