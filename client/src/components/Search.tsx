import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import clsx from 'clsx';

import { Button } from './Button';
import { AnimationProvider } from './AnimationProvider';

export const Search = () => {
  const [isSearchFieldVisible, setIsSearchFieldVisible] = useState<boolean>(true);

  return (
    <>
      <Button
        onClickFunc={() => setIsSearchFieldVisible((prev) => !prev)}
        className="md:hidden order-3"
      >
        <IoSearchSharp />
      </Button>
      <div className="md:order-2 md:ml-auto md:mr-0 order-4 w-full md:max-w-[400px]">
        <AnimationProvider
          transition={{ duration: 0.3 }}
          keyValue={isSearchFieldVisible.toString()}
        >
          <label
            className={clsx(
              'flex px-2 py-1 border border-gray-400 rounded-full items-center focus-within:border-gray-700 focus-within:shadow-[0_0_0_1px_gray] dark:focus-within:border-gray-300 dark:focus-within:shadow-[0_0_0_1px_gray] transition-all duration-300 ease-in-out',
              !isSearchFieldVisible && 'hidden md:flex'
            )}
          >
            <input
              type="text"
              placeholder="Search..."
              className="outline-0 peer bg-transparent w-full placeholder:text-gray-400 placeholder:text-sm md:placeholder:text-base"
            />
            <IoSearchSharp className="text-gray-400 peer-focus:text-gray-700 transition-colors duration-300 dark:peer-focus:text-gray-300" />
          </label>
        </AnimationProvider>
      </div>
    </>
  );
};
