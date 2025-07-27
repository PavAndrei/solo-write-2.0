// components/ToggleSortButton.tsx
import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export const ToggleSortButton = () => {
  const [order, setOrder] = useState('newest');

  return (
    <button
      onClick={() => setOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
      className="ml-14 xl:ml-0 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full shadow hover:bg-gray-700 transition duration-200 max-w-[280px]"
    >
      {order === 'newest' ? (
        <>
          <FaArrowDown />
          <span>Newest first</span>
        </>
      ) : (
        <>
          <FaArrowUp />
          <span>Oldest first</span>
        </>
      )}
    </button>
  );
};
