import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CATEGORIES } from '../constants/categories';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setCategories } from '../redux/filters/slice';

export const Categories: FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showArrows, setShowArrows] = useState(false);

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.filters);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category: string) => {
    if (categories?.indexOf(category) === -1) {
      dispatch(setCategories([...categories, category]));
    } else {
      dispatch(setCategories(categories?.filter((categoryItem) => categoryItem !== category)));
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const isOverflowing = container.scrollWidth > container.clientWidth;
      const isMobile = window.innerWidth < 1180;
      setShowArrows(isOverflowing && isMobile);
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  console.log(categories);

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white dark:from-gray-700 to-transparent z-10 xl:hidden" />

      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white dark:from-gray-700 to-transparent z-10" />

      {showArrows && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white dark:bg-black shadow-md rounded-full transition hover:scale-105 active:scale-95"
          onClick={() => scroll('left')}
        >
          <FaChevronLeft className="text-black dark:text-white text-sm" />
        </button>
      )}

      {showArrows && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white dark:bg-black shadow-md rounded-full transition hover:scale-105 active:scale-95"
          onClick={() => scroll('right')}
        >
          <FaChevronRight className="text-black dark:text-white text-sm" />
        </button>
      )}

      <div ref={scrollContainerRef} className="overflow-y-auto scrollbar-hide scrollbar-none">
        <ul className="flex gap-3 pl-14 xl:pl-0 pr-20 py-2 whitespace-nowrap">
          {CATEGORIES.map((category) => (
            <li
              key={category}
              className={clsx(
                'cursor-pointer px-4 py-1 rounded-full text-sm transition-all duration-200',
                'active:scale-95 text-md font-semibold bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900 border dark:border border-gray-300 dark:border-gray-900',
                categories?.includes(category) && 'border-gray-900 dark:border-white'
              )}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}

          <li className="min-w-[40px] sm:min-w-[60px] xl:hidden" aria-hidden />
        </ul>
      </div>
    </div>
  );
};
