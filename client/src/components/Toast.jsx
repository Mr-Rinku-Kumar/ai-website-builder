import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: { icon: FiCheckCircle, bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    error: { icon: FiXCircle, bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/20' },
    warning: { icon: FiAlertTriangle, bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/20' },
    info: { icon: FiInfo, bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/20' },
  };

  const Icon = types[type].icon;

  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl glass-morphism border ${types[type].border} min-w-[300px] max-w-md animate-slide-in`}>
      <Icon className={`text-2xl ${types[type].text}`} />
      <p className="text-white flex-1 text-sm">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
        <FiX />
      </button>
    </div>
  );
};

export default Toast; // ✅ Make sure this is here