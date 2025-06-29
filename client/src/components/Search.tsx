import { IoSearchSharp } from 'react-icons/io5';

export const Search = () => {
  return (
    <label className="rounded-full border border-gray-400 py-1 px-2 relative md:w-[400px] w-full focus-within:border-gray-700 focus-within:shadow-[0_0_0_1px_gray] dark:focus-within:border-gray-300 dark:focus-within:shadow-[0_0_0_1px_gray] transition-all duration-300 ease-in-out">
      <input
        type="text"
        placeholder="Search..."
        className="pl-1.5 outline-0 peer bg-transparent w-full placeholder:text-gray-400"
      />
      <IoSearchSharp className="absolute top-[28%] right-[5%] text-gray-400 peer-focus:text-gray-700 transition-colors duration-300 dark:peer-focus:text-gray-300" />
    </label>
  );
};
