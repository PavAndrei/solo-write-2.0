import { FC, useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import { removeToast } from '../redux/toast/slice';

export interface ToastProps {
  id: string;
  color: 'error' | 'success';
  text: string;
  duration: number;
}

export const Toast: FC<ToastProps> = ({ id, color, text, duration = 6000 }) => {
  const dispatch = useAppDispatch();

  const destroy = () => {
    dispatch(removeToast({ id }));
  };

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className="flex flex-col gap-2 relative z-[1000] rounded-md top-6 right-2.5 border-1 bg-gradient-to-r from-gray-900 to-gray-400 text-gray-100 border-gray-400 p-2.5">
      <button onClick={destroy} className="self-end cursor-pointer">
        X
      </button>
      <div>{text}</div>
    </div>
  );
};
