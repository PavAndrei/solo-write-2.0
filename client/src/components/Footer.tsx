import { FaCopyright } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="mt-auto mb-0 bg-gray-100 border-t border-t-gray-400 pt-10">
      <span className="p-3 w-full border-t border-gray-400 flex items-center justify-center gap-1.5 text-gray-500">
        <FaCopyright />
        <span>All rights reserved</span>
      </span>
    </footer>
  );
};
