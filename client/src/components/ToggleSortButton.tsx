import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setOrder } from '../redux/filters/slice';
import { FC } from 'react';
import clsx from 'clsx';

interface ToggleSortButton {
  className?: string;
  isLeftGap?: boolean;
}

export const ToggleSortButton: FC<ToggleSortButton> = ({ className, isLeftGap }) => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.filters);

  const changeOrder = () => {
    dispatch(setOrder(order === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <button
      onClick={changeOrder}
      className={clsx(
        isLeftGap && 'md:ml-14 xl:ml-0',
        'flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 text-md font-semibold hover:bg-gray-400 rounded-full shadow transition duration-200 w-fit max-w-[280px] cursor-pointer active:scale-95',
        className
      )}
    >
      {order === 'asc' ? (
        <>
          <FaArrowDown />
          <span>Newest first</span>
        </>
      ) : (
        <>
          <FaArrowUp />
          <span>Oldest first</span>
        </>
      )}
    </button>
  );
};
