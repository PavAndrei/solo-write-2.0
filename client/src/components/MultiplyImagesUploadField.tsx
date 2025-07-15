import { forwardRef, useState, useRef } from 'react';
import { FiX, FiUpload } from 'react-icons/fi';

interface MultipleImagesUploadFieldProps {
  labelText: string;
  error?: string;
  onChange: (files: FileList | null) => void;
  value?: FileList | null;
  maxFiles?: number;
}

export const MultipleImagesUploadField = forwardRef<
  HTMLInputElement,
  MultipleImagesUploadFieldProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
>(({ labelText, error, onChange, value, maxFiles = 4, ...rest }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);
    const existingFiles = value ? Array.from(value) : [];
    const allFiles = [...existingFiles, ...newFiles].slice(0, maxFiles);

    const dataTransfer = new DataTransfer();
    allFiles.forEach((file) => dataTransfer.items.add(file));

    onChange(dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    if (!value) return;

    const updatedFiles = Array.from(value).filter((_, i) => i !== index);
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));

    onChange(dataTransfer.files.length > 0 ? dataTransfer.files : null);
  };

  const handleClick = () => {
    if (value && value.length >= maxFiles) return;
    inputRef.current?.click();
  };

  const currentFiles = value ? Array.from(value) : [];

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="italic text-base md:text-lg font-medium">{labelText}</span>

      <div className="flex flex-wrap gap-4">
        {currentFiles.map((file, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-400"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {hoveredIndex === index && (
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                onClick={() => handleRemove(index)}
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        ))}

        {currentFiles.length < maxFiles && (
          <div
            className="w-24 h-24 rounded-md border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors"
            onClick={handleClick}
          >
            <div className="flex flex-col items-center text-gray-500">
              <FiUpload size={20} />
              <span className="text-xs mt-1">Upload</span>
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        ref={(e) => {
          if (typeof ref === 'function') ref(e);
          else if (ref) ref.current = e;
          inputRef.current = e;
        }}
        onChange={handleFileChange}
        className="hidden"
        {...rest}
      />

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
});
