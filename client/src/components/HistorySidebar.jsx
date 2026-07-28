// client/src/components/HistorySidebar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { 
  FiClock, 
  FiX, 
  FiTrash2, 
  FiSearch,
  FiArrowRight
} from 'react-icons/fi'; // ✅ Only available icons
import toast from 'react-hot-toast';

const HistorySidebar = ({ 
  isOpen, 
  onClose, 
  history, 
  onSelect, 
  onClear 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(history);
  const [selectedId, setSelectedId] = useState(null);
  const sidebarRef = useRef(null);

  // ✅ Filter history based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter(entry =>
        entry.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.theme?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  }, [searchTerm, history]);

  // ✅ Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // ✅ Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // ✅ Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSelect = (entry) => {
    setSelectedId(entry.id);
    setTimeout(() => {
      onSelect(entry);
      setSelectedId(null);
    }, 300);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      portfolio: '🎨',
      restaurant: '🍽️',
      gym: '💪',
      hospital: '🏥',
      ecommerce: '🛒',
      education: '📚',
      startup: '🚀',
      agency: '🏢',
      general: '🌐'
    };
    return emojis[category] || '📄';
  };

  const getThemeEmoji = (theme) => {
    const emojis = {
      modern: '✨',
      dark: '🌙',
      light: '☀️',
      corporate: '💼',
      glassmorphism: '🪟'
    };
    return emojis[theme] || '🎨';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* ✅ Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* ✅ Sidebar */}
      <div 
        ref={sidebarRef}
        className="relative ml-auto w-full max-w-md h-full bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl animate-slide-in-right overflow-hidden"
      >
        {/* ✅ Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <FiClock className="text-white text-xl" /> {/* ✅ Changed from FiHistory to FiClock */}
            </div>
            <div>
              <h3 className="text-white font-semibold">History</h3>
              <p className="text-gray-400 text-xs">{history.length} websites</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClear}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                aria-label="Clear all history"
                title="Clear all history"
              >
                <FiTrash2 className="text-lg" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Close history"
            >
              <FiX className="text-2xl" />
            </button>
          </div>
        </div>

        {/* ✅ Search */}
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search history..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <FiX className="text-lg" />
              </button>
            )}
          </div>
        </div>

        {/* ✅ History List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] p-4 space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-400">
                {searchTerm ? 'No matching history found' : 'No history yet'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredHistory.map((entry, index) => (
              <button
                key={entry.id}
                onClick={() => handleSelect(entry)}
                className={`w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-all duration-300 group border border-transparent hover:border-purple-500/20 ${
                  selectedId === entry.id ? 'scale-95 opacity-50' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flex items-start gap-3">
                  {/* ✅ Category Icon */}
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 transition-transform">
                    {getCategoryEmoji(entry.category)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate group-hover:text-purple-300 transition-colors">
                      {entry.prompt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiClock className="text-xs" />
                        {formatDate(entry.timestamp)}
                      </span>
                      
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 flex items-center gap-1">
                        {getThemeEmoji(entry.theme)} {entry.theme}
                      </span>
                      
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 flex items-center gap-1">
                        {getCategoryEmoji(entry.category)} {entry.category}
                      </span>
                    </div>
                  </div>
                  
                  <FiArrowRight className="text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* ✅ Footer Stats */}
        {filteredHistory.length > 0 && (
          <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/5 p-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{filteredHistory.length} entries</span>
              <span>
                {searchTerm ? `Filtered from ${history.length}` : `Total ${history.length}`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Default Export
export default HistorySidebar;