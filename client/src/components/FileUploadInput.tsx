import { FC, useEffect, useRef, useState } from 'react';
import { AnimationProvider } from './AnimationProvider';
import { TiDelete } from 'react-icons/ti';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface FileUploadInputProps {
  name: string;
  value?: FileList;
  onChange: (value: FileList | undefined) => void;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export const FileUploadInput: FC<FileUploadInputProps> = ({ name, value, onChange, error }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (!value?.[0]) {
      setPreview('');
    } else {
      const objectUrl = URL.createObjectURL(value[0]);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [value]);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        className="hidden"
        accept="image/*"
        onChange={(e) => onChange(e.target.files || undefined)}
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
              src={preview || 'https://placehold.co/120/E5E7EB/4B5563?text=Avatar'}
              alt=""
            />

            {value?.[0] && preview && (
              <TiDelete
                className="absolute top-4 right-[30%] cursor-pointer text-5xl transition-colors duration-300 hover:text-rose-900 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(undefined);
                }}
              />
            )}
          </AnimationProvider>
        </div>
        {error && <span className="text-red-500 text-sm text-center">{error.toString()}</span>}
      </div>
    </>
  );
};
