import React from 'react';
import { TaskItem } from './TaskItem';

export type TaskListProps = {
  tasks: string[];
  likes: Record<string, boolean>;
  onLike: (index: number) => void;
  isHoverEnabled: boolean;
  isLikeAnimEnabled: boolean;
  setRef: (index: number, el: HTMLElement | null) => void;
  setLikeRef: (index: number, el: HTMLButtonElement | null) => void;
};

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, likes, onLike, isHoverEnabled, isLikeAnimEnabled, setRef, setLikeRef 
}) => {
  return (
    <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
        Recent Tasks
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
        {tasks.map((task, i) => (
          <TaskItem 
            key={i}
            index={i}
            task={task}
            isLiked={!!likes[i]}
            onLike={() => onLike(i)}
            isHoverEnabled={isHoverEnabled}
            isLikeAnimEnabled={isLikeAnimEnabled}
            setRef={(el) => setRef(i, el)}
            setLikeRef={(el) => setLikeRef(i, el)}
          />
        ))}
      </div>
    </div>
  );
};
