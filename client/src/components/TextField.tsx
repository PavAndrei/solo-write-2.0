import { ChangeEvent, FC, useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface TextFieldProps {
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  placeholder: string;
}

export const TextField: FC<TextFieldProps> = ({
  name,
  value,
  handleChange,
  labelText,
  placeholder,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isPassword = name === 'password' || name === 'repeatPassword';

  return (
    <label className="flex flex-col gap-1.5 relative">
      <span className="italic text-base md:text-lg cursor-pointer font-medium">{labelText}</span>
      <input
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        type={isPassword && !isPasswordVisible ? 'password' : 'text'}
        className="bg-gray-200 outline-0 border rounded-md h-9 pl-8 text-sm md:text-base placeholder:text-sm md:placeholder:text-base focus:border-gray-500 border-gray-400 focus:border-2 transition-all duration-300 ease-in-out text-gray-900 placeholder:text-gray-500"
        placeholder={placeholder}
        autoComplete={name}
      />

      {name === 'username' && <FaUser className="absolute top-10 md:top-11 left-2 text-gray-900" />}
      {name === 'email' && <MdEmail className="absolute top-10 md:top-11 left-2 text-gray-900" />}
      {isPassword && <FaKey className="absolute top-10 md:top-11 left-2 text-gray-900" />}

      {isPassword && (
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? (
            <IoEye className="absolute top-10 md:top-11 right-2" />
          ) : (
            <IoEyeOff className="absolute top-10 md:top-11 right-2" />
          )}
        </button>
      )}
    </label>
  );
};
