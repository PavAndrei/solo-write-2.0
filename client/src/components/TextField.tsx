import { forwardRef, useState } from 'react';
import { FaUser, FaKey, FaHeading } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface TextFieldProps {
  labelText: string;
  placeholder: string;
  name?: string;
  error?: string;
}

export const TextField = forwardRef<
  HTMLInputElement,
  TextFieldProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ labelText, placeholder, name, error, type, ...rest }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isPassword = name === 'password' || name === 'repeatPassword';
  const inputType = isPassword && !isPasswordVisible ? 'password' : 'text';

  return (
    <label className="flex flex-col gap-1.5 relative">
      <span className="italic text-base md:text-lg cursor-pointer font-medium">{labelText}</span>

      <input
        ref={ref}
        name={name}
        type={isPassword ? inputType : type}
        className="bg-gray-200 outline-0 border rounded-md h-9 pl-8 text-sm md:text-base placeholder:text-sm md:placeholder:text-base focus:border-gray-500 dark:focus:outline-2 dark:focus:outline-gray-200 border-gray-400 focus:border-2 transition-all duration-300 ease-in-out text-gray-900 placeholder:text-gray-500 z-0"
        placeholder={placeholder}
        autoComplete={name}
        {...rest}
      />

      {name === 'username' && <FaUser className="absolute top-10 md:top-11 left-2 text-gray-900" />}
      {name === 'email' && <MdEmail className="absolute top-10 md:top-11 left-2 text-gray-900" />}
      {name === 'title' && <FaHeading className="absolute top-10 md:top-11 left-2 text-gray-900" />}
      {isPassword && <FaKey className="absolute top-10 md:top-11 left-2 text-gray-900" />}

      {isPassword && (
        <button
          type="button"
          className="cursor-pointer group"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? (
            <IoEye className="absolute top-10 md:top-11 right-2 text-gray-500 dark:text-gray-500 group-focus:text-gray-950 hover:text-gray-950 transition-colors duration-300 ease-in-out" />
          ) : (
            <IoEyeOff className="absolute top-10 md:top-11 right-2 text-gray-500 dark:text-gray-500 group-focus:text-gray-950 hover:text-gray-950 transition-colors duration-300 ease-in-out" />
          )}
        </button>
      )}

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </label>
  );
});
