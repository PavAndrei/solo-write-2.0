import { FaSpinner } from 'react-icons/fa';

export const SpinnerLoading = () => {
  return (
    <div className="fixed top-1/3 inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <FaSpinner className="animate-spin text-4xl" />
    </div>
  );
};
