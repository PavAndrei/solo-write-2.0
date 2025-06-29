import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';
import { FC } from 'react';

interface DropdownMenu {
  visibility: boolean;
  closeDropdown: () => void;
}

export const DropdownMenu: FC<DropdownMenu> = ({ visibility, closeDropdown }) => {
  return (
    <div
      className={clsx(
        'absolute flex flex-col top-0 right-0 bg-gray-300 dark:bg-gray-800 p-2.5 text-base sm:text-lg w-1/2 text-center rounded-bl-2xl transition-transform duration-300 ease-in-out',
        visibility ? 'translate-y-0' : 'translate-y-[-200%]'
      )}
    >
      <IoClose onClick={closeDropdown} className="self-end text-2xl sm:text-3xl mr-2" />
      <ul className="flex flex-col gap-2.5">
        <li className="border-b border-b-gray-400 pb-2.5">Sign In</li>
        <li className="border-b border-b-gray-400 pb-2.5">Sign Up</li>
        <li className="border-b border-b-gray-400 pb-2.5">Write An Article</li>
        <li className="pb-2.5">Catalogue</li>
      </ul>
    </div>
  );
};
