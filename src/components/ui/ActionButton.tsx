import React from 'react';
import { motion } from 'motion/react';
import * as Ariakit from '@ariakit/react';

export type ActionButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  whileHover?: any;
  whileTap?: any;
  initial?: any;
  animate?: any;
  variants?: any;
  title?: string;
};

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ onClick, children, className, whileHover, whileTap, initial, animate, variants, title }, ref) => {
    return (
      <Ariakit.Button
        render={
          <motion.button
            whileHover={whileHover}
            whileTap={whileTap}
            initial={initial}
            animate={animate}
            variants={variants}
          />
        }
        ref={ref}
        onClick={onClick}
        className={className}
        title={title}
      >
        {children}
      </Ariakit.Button>
    );
  }
);

ActionButton.displayName = 'ActionButton';
