import { FC } from 'react';

interface CustomTextareaProps {
  [key: string]: any; // Это позволит принять все пропсы, включая ...register
  error?: string;
}

export const CustomTextarea: FC<CustomTextareaProps> = ({ error, ...props }) => {
  return (
    <div className="w-full flex flex-col">
      <textarea
        {...props}
        className={`outline-1 dark:outline-gray-100 outline-gray-950 focus:outline-2 placeholder:text-gray-400 rounded-md p-2 md:w-3/4 w-full self-center resize-none h-[220px] transition-all duration-300 ease-in-out bg-gray-600 ${
          error ? 'border border-red-500' : ''
        }`}
        placeholder="Comment this..."
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 self-center md:w-3/4 w-full">{error}</span>
      )}
    </div>
  );
};
