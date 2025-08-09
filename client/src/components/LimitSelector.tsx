import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setLimit } from '../redux/filters/slice';

interface LimitSelectorProps {
  options?: number[];
}

export const LimitSelector: FC<LimitSelectorProps> = ({ options = [5, 10, 20, 50] }) => {
  const dispatch = useAppDispatch();
  const { limit } = useAppSelector((state) => state.filters);

  const handleChange = (value: number) => {
    dispatch(setLimit(value));
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="italic text-base font-medium">Items per page:</span>
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="limit"
              value={option}
              checked={limit === option}
              onChange={() => handleChange(option)}
              className="cursor-pointer"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};
