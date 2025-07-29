import clsx from 'clsx';
import { FC } from 'react';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handlePageClick: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handleNextPage,
  handlePreviousPage,
  handlePageClick,
}) => {
  console.log(currentPage);

  return (
    <div className="mx-auto w-full flex items-center justify-center gap-3 pt-5">
      <button onClick={handlePreviousPage} className=" cursor-pointer p-2 min-w-9">
        <GrCaretPrevious className="text-xl" />
      </button>
      {[...Array(totalPages)].map((_, index) => {
        return (
          <button
            onClick={() => handlePageClick(index + 1)}
            disabled={currentPage === index + 1}
            key={index}
            className={clsx(
              `text-lg cursor-pointer p-2 border rounded-lg min-w-9 text-center bg-gray-300 dark:bg-gray-700 transition-all duration-300 ease-in-out`,
              currentPage === index + 1 && 'bg-gray-400'
            )}
          >
            {index + 1}
          </button>
        );
      })}
      <button onClick={handleNextPage} className="cursor-pointer min-w-9 p-2">
        <GrCaretNext className="text-xl" />
      </button>
    </div>
  );
};
