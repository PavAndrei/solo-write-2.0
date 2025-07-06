import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { AnimationProvider } from './AnimationProvider';
import { TiDelete } from 'react-icons/ti';

interface FileUploadInputProps {
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  file?: File | null | undefined;
  handleFileRemove: () => void;
}

export const FileUploadInput: FC<FileUploadInputProps> = ({
  name,
  file,
  handleChange,
  handleFileRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!file) {
      setPreview('');
    } else {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [file]);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        onChange={handleChange}
        className="hidden"
        accept="image/*"
      />

      <div className="flex flex-col gap-1.5 relative">
        <span
          onClick={() => fileInputRef.current?.click()}
          className="italic text-base md:text-lg cursor-pointer font-medium"
        >
          {'Choose Your Photo (optional)'}
        </span>
        <div
          className="bg-gray-200 rounded-full h-30 w-30 self-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <AnimationProvider keyValue={preview}>
            <img
              className="object-cover h-30 w-30 rounded-full border-2 border-dashed border-gray-400"
              src={preview ? preview : 'https://placehold.co/120/E5E7EB/4B5563?text=Avatar'}
              alt=""
            />
            {file && preview && (
              <TiDelete
                className="absolute top-4 right-[30%] cursor-pointer text-5xl transition-colors duration-300 hover:text-rose-900 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFileRemove();
                }}
              />
            )}
          </AnimationProvider>
        </div>
      </div>
    </>
  );
};
