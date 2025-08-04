import { ChangeEvent, FC } from 'react';

interface CustomTextareaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CustomTextarea: FC<CustomTextareaProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="outline-1 dark:outline-gray-100 outline-gray-950 focus:outline-2 placeholder:text-gray-400 rounded-md p-2 md:w-3/4 w-full self-center resize-none h-[220px] transition-all duration-300 ease-in-out bg-gray-600"
      placeholder="Comment this..."
    />
  );
};
