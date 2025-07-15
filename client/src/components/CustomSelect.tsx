import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import { FaListOl } from 'react-icons/fa';
import { AnimationProvider } from './AnimationProvider';

interface CustomSelectProps {
  name: string;
  labelText: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  name,
  labelText,
  options,
  selected,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      if (selected.length < 4) {
        onChange([...selected, option]);
      }
    }
  };

  return (
    <div className="relative flex flex-col gap-1.5">
      <span className="italic text-base md:text-lg font-medium">{labelText}</span>

      <div
        className={clsx(
          'relative bg-gray-200 border border-gray-400 focus-within:border-2 focus-within:border-gray-500 rounded-md px-3 py-2 cursor-pointer text-sm md:text-base text-gray-900',
          isOpen && 'border-2 border-gray-500'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ml-5 text-gray-500 z-0">
          {selected.length > 0 ? selected.join(', ') : 'Select categories...'}
        </span>
        <FaListOl className="absolute top-3 md:top-3 left-2 text-gray-900" />
      </div>

      {isOpen && (
        <ul className="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto">
          <AnimatePresence>
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <AnimationProvider key={option}>
                  <li
                    key={option}
                    onClick={() => toggleOption(option)}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 transition text-gray-600 ${
                      isSelected ? 'bg-gray-100 font-semibold' : ''
                    }`}
                  >
                    {option}
                  </li>
                </AnimationProvider>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
