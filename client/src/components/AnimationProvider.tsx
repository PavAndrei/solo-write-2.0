import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { Key, ReactNode } from 'react';

interface AnimationProviderProps extends MotionProps {
  children: ReactNode;
  keyValue?: Key | null | undefined;
  className?: string;
}

export const AnimationProvider = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  transition = { duration: 1 },
  keyValue,
  className,
}: AnimationProviderProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
