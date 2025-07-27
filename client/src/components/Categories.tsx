import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CATEGORIES } from '../constants/categories';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Categories: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showArrows, setShowArrows] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
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

  return (
    <div className="relative w-full">
      {/* Fading gradient left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white dark:from-gray-700 to-transparent z-10 xl:hidden" />

      {/* Fading gradient right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white dark:from-gray-700 to-transparent z-10" />

      {/* Left Arrow */}
      {showArrows && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white dark:bg-black shadow-md rounded-full transition hover:scale-105 active:scale-95"
          onClick={() => scroll('left')}
        >
          <FaChevronLeft className="text-black dark:text-white text-sm" />
        </button>
      )}

      {/* Right Arrow */}
      {showArrows && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white dark:bg-black shadow-md rounded-full transition hover:scale-105 active:scale-95"
          onClick={() => scroll('right')}
        >
          <FaChevronRight className="text-black dark:text-white text-sm" />
        </button>
      )}

      {/* Scrollable container */}
      <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar scroll-smooth">
        <ul className="flex gap-3 pl-14 xl:pl-0 pr-20 py-2 whitespace-nowrap">
          {CATEGORIES.map((category) => (
            <li
              key={category}
              className={clsx(
                'cursor-pointer px-4 py-1 rounded-full border text-sm transition-all duration-200',
                'active:scale-95',
                activeCategory.includes(category)
                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white border-transparent',
                'md:hover:bg-gray-300 md:dark:hover:bg-gray-700'
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
