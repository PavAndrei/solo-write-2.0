import { FC, useRef } from 'react';
import { FaCheck } from 'react-icons/fa';

interface CustomCheckboxProps {
  name: string;
  value: boolean | undefined;
  onChange: (checked: boolean) => void;
  labelText: string;
  error?: string;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  name,
  value,
  onChange,
  labelText,
  error,
}) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        ref={checkboxRef}
        type="checkbox"
        name={name}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />

      <div
        className="flex gap-1 items-center ml-0 mr-auto cursor-pointer"
        onClick={() => checkboxRef.current?.click()}
      >
        <div className="w-5 h-5 rounded-sm border-2 border-gray-500 flex items-center justify-center">
          {value && <FaCheck />}
        </div>
        <span className="italic text-base md:text-lg">{labelText}</span>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
};
