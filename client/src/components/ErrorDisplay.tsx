import React from 'react';
import { FaExclamationCircle, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ErrorDisplayProps {
  errorMessage: string;
  onClickFunc?: () => void;
  className?: string;
  onClickFuncText?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorMessage,
  onClickFunc,
  onClickFuncText,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col grow-1 items-center justify-center p-6 rounded-lg text-center ${className}`}
    >
      <FaExclamationCircle className="text-red-500 text-5xl mb-4 animate-pulse" />

      <h3 className="text-xl font-semibold text-red-500 mb-2">Error occured!</h3>
      <p className="mb-4">{errorMessage}</p>

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
        className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-700 rounded transition duration-300 ease-in-out"
      >
        <FaRedo /> Reload the page
      </button>
    </div>
  );
};

export default ErrorDisplay;
