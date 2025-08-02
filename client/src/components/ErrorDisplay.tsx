import React from 'react';
import { FaExclamationCircle, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LuNotepadText } from 'react-icons/lu';

interface ErrorDisplayProps {
  errorMessage: string;
  onClickFunc?: () => void;
  className?: string;
  onClickFuncText?: string;
  hasArticlesButton?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorMessage,
  onClickFunc,
  onClickFuncText,
  className = '',
  hasArticlesButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col gap-5  grow-1 items-center justify-center px-6 rounded-lg text-center ${className}`}
    >
      <FaExclamationCircle className="text-red-500 text-5xl animate-pulse" />

      <h3 className="text-xl font-semibold text-red-500">Error occured!</h3>
      <p>{errorMessage}</p>

      {onClickFunc && (
        <button
          onClick={onClickFunc}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition"
        >
          <FaRedo /> {onClickFuncText}
        </button>
      )}

      <button
        onClick={() => navigate(0)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-700 rounded transition duration-300 ease-in-out text-lg"
      >
        <FaRedo /> Reload the page
      </button>

      {hasArticlesButton && (
        <button
          onClick={() => navigate('/articles')}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-700 rounded transition duration-300 ease-in-out text-lg"
        >
          <LuNotepadText /> To the articles list
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
