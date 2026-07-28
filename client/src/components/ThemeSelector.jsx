import React from 'react';
import { FiSettings } from 'react-icons/fi'; // ✅ Using FiSettings instead

const ThemeSelector = ({ selected, onChange, themes }) => {
  const themeColors = {
    modern: 'from-blue-500 to-purple-500',
    dark: 'from-gray-700 to-gray-900',
    light: 'from-blue-50 to-white',
    corporate: 'from-blue-700 to-blue-900',
    glassmorphism: 'from-purple-400/20 to-pink-400/20',
  };

  return (
    <div className="flex items-center gap-2">
      <FiSettings className="text-gray-400 text-xl" />
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all duration-300 cursor-pointer"
      >
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value} className="bg-gray-800">
            {theme.label}
          </option>
        ))}
      </select>
      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${themeColors[selected]}`}></div>
    </div>
  );
};

export default ThemeSelector;