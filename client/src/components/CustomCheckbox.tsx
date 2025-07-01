import { FC, useState, useRef } from 'react';
import { FaCheck } from 'react-icons/fa';

interface CustomCheckboxProps {
  labelText: string;
  name: string;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({ name, labelText }) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <input
        ref={checkboxRef}
        checked={isChecked}
        onChange={handleChange}
        name={name}
        type="checkbox"
        className="hidden"
      />

      <div
        className="flex gap-1 items-center ml-0 mr-auto cursor-pointer"
        onClick={() => checkboxRef.current?.click()}
      >
        <div className="w-5 h-5 rounded-sm border-2 border-gray-500 flex items-center justify-center">
          {isChecked && <FaCheck />}
        </div>
        <span className="italic text-base md:text-lg">{labelText}</span>
      </div>
    </>
  );
};
