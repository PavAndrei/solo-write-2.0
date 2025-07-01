import { ChangeEvent, useRef, useState } from 'react';
import { AnimationProvider } from './AnimationProvider';
import { TiDelete } from 'react-icons/ti';

export const FileUploadInput = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const avatar = files[0];
      setPreview(URL.createObjectURL(avatar));
      setFile(avatar);

      console.log(avatar);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
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
                  setPreview('');
                  setFile(null);
                }}
              />
            )}
          </AnimationProvider>
        </div>
      </div>
    </>
  );
};
