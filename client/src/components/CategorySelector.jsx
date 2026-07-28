import React from 'react';
import { FiGrid } from 'react-icons/fi'; // ✅ Using FiGrid instead

const CategorySelector = ({ selected, onChange, categories }) => {
  return (
    <div className="flex items-center gap-2">
      <FiGrid className="text-gray-400 text-xl" />
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all duration-300 cursor-pointer"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value} className="bg-gray-800">
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;