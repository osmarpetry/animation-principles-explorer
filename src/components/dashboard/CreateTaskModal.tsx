import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export type CreateTaskModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (taskName: string) => void;
  isStagingEnabled: boolean;
  setInputRef: (el: HTMLInputElement | null) => void;
  setSaveRef: (el: HTMLButtonElement | null) => void;
  value: string;
  onChange: (val: string) => void;
};

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ 
  open, onClose, onConfirm, isStagingEnabled, setInputRef, setSaveRef, value, onChange 
}) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isStagingEnabled ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isStagingEnabled ? 0.3 : 0.01 }}
            className={`fixed inset-0 z-40 ${isStagingEnabled ? 'bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm' : 'bg-transparent'}`}
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, duration: isStagingEnabled ? undefined : 0.01 }}
            className="relative z-50 bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-slate-100 dark:border-slate-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">Create Task</h2>
              <button onClick={onClose} className="text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded">
                <X size={16} />
              </button>
            </div>
            <input 
              ref={setInputRef}
              autoFocus
              type="text" 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Task name..." 
              className="w-full p-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg mb-4 text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-400" 
            />
            <button 
              ref={setSaveRef}
              onClick={() => onConfirm(value)}
              className="w-full bg-indigo-600 dark:bg-indigo-500 text-white font-bold py-2 rounded-lg text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Save Task
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
