export const Logo = () => {
  return (
    <div className="flex cursor-pointer">
      <div className="rounded-full py-0.5 px-2 bg-gradient-to-r from-gray-800 to-gray-300">
        <span className="text-gray-100 text-xl md:text-2xl font-semibold">Solo</span>
      </div>
      <div className="rounded-full py-0.5 px-2 bg-gradient-to-l from-gray-300 to-gray-100 ml-[-8px]">
        <span className="text-gray-900 text-xl md:text-2xl font-semibold">Write</span>
      </div>
    </div>
  );
};
