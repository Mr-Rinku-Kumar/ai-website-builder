import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ClearButton = ({ onClear, label = 'Clear' }) => {
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear everything?')) {
      onClear();
      toast.success('Cleared successfully');
    }
  };

  return (
    <button
      onClick={handleClear}
      className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all duration-300"
    >
      <FiTrash2 />
      {label}
    </button>
  );
};

export default ClearButton;