import { useAppSelector } from '../redux/store';
import { AnimationProvider } from './AnimationProvider';
import { Toast } from './Toast';
import { AnimatePresence } from 'framer-motion';

export const ToastProvider = () => {
  const { toastList } = useAppSelector((state) => state.toast);

  return (
    <div className="flex flex-col gap-2.5 absolute top-1 right-2.5 z-50">
      <AnimatePresence>
        {toastList.map((toastItem) => (
          <AnimationProvider
            key={toastItem.id}
            initial={{ y: -100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Toast
              duration={6000}
              id={toastItem.id}
              color={toastItem.color}
              text={toastItem.text}
            />
          </AnimationProvider>
        ))}
      </AnimatePresence>
    </div>
  );
};
