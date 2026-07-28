import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const RegenerateButton = ({ onRegenerate, loading, disabled }) => {
  return (
    <button
      onClick={onRegenerate}
      disabled={loading || disabled}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
      Regenerate
    </button>
  );
};

export default RegenerateButton;