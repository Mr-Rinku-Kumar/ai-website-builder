// client/src/pages/Home.jsx

import React, { useState, useEffect, useRef } from 'react';
import { 
  FiZap, 
  FiDownload, 
  FiCopy, 
  FiTrash2, 
  FiRefreshCw, 
  FiClock,
  FiCheck,
  FiCode,
  FiEye,
  FiEyeOff,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiHeart,
  FiArrowRight,
  // FiSparkles
} from 'react-icons/fi';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import PromptInput from '../components/PromptInput';
import PreviewSection from '../components/PreviewSection';
import LoadingSpinner from '../components/LoadingSpinner';
import ThemeSelector from '../components/ThemeSelector';
import CategorySelector from '../components/CategorySelector';
import HistorySidebar from '../components/HistorySidebar';
import { generateWebsite } from '../services/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { THEMES, CATEGORIES, EXAMPLE_PROMPTS } from '../utils/constants';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('modern');
  const [category, setCategory] = useState('general');
  const [generationTime, setGenerationTime] = useState(null);
  const [history, setHistory] = useLocalStorage('websiteHistory', []);
  const [showExamples, setShowExamples] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null);
  const inputRef = useRef(null);

  // ✅ Auto-scroll to preview when generated
  useEffect(() => {
    if (generatedHtml && previewRef.current) {
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 300);
    }
  }, [generatedHtml]);

  // ✅ Keyboard shortcut: Ctrl+Enter to generate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [prompt, theme, category]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a website description', {
        icon: '✍️',
        duration: 3000,
      });
      inputRef.current?.focus();
      return;
    }

    setIsGenerating(true);
    setLoading(true);
    setError(null);
    setGenerationTime(null);

    try {
      const startTime = performance.now();
      const result = await generateWebsite(prompt, theme, category);
      const endTime = performance.now();
      
      setGeneratedHtml(result.html);
      setGenerationTime(Math.round(endTime - startTime));
      
      // ✅ Save to history
      const newEntry = {
        id: Date.now(),
        prompt: prompt.trim(),
        theme,
        category,
        timestamp: new Date().toISOString(),
        html: result.html,
      };
      setHistory([newEntry, ...history.slice(0, 49)]); // Keep last 50
      
      toast.success('✨ Website generated successfully!', {
        duration: 3000,
        icon: '🚀',
      });
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to generate website', {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    if (!prompt && !generatedHtml) {
      toast('Nothing to clear', { icon: '🧹' });
      return;
    }
    
    setPrompt('');
    setGeneratedHtml('');
    setError(null);
    setGenerationTime(null);
    toast.success('🧹 Cleared successfully', { duration: 2000 });
    inputRef.current?.focus();
  };

  const handleRegenerate = () => {
    if (prompt.trim()) {
      toast('🔄 Regenerating...', { duration: 1500 });
      handleGenerate();
    } else {
      toast.error('No prompt to regenerate', { icon: '🤔' });
    }
  };

  const loadFromHistory = (entry) => {
    setPrompt(entry.prompt);
    setTheme(entry.theme || 'modern');
    setCategory(entry.category || 'general');
    setGeneratedHtml(entry.html);
    setShowHistory(false);
    toast.success('📂 Loaded from history', { duration: 2000 });
    // Scroll to preview after load
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const useExamplePrompt = (example) => {
    setPrompt(example);
    setShowExamples(false);
    toast('📝 Example loaded!', { duration: 1500 });
    inputRef.current?.focus();
  };

  const clearHistory = () => {
    if (history.length === 0) {
      toast('History is already empty', { icon: '📭' });
      return;
    }
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      toast.success('🗑️ History cleared', { duration: 2000 });
    }
  };

  // ✅ Stats
  const stats = {
    totalGenerated: history.length,
    lastGenerated: history.length > 0 ? new Date(history[0].timestamp).toLocaleString() : 'Never',
    avgTime: history.length > 0 ? Math.round(history.reduce((acc, h) => acc + (h.generationTime || 0), 0) / history.length) : 0,
  };

  return (
    <div className="min-h-screen">
      <Navbar onHistoryClick={() => setShowHistory(true)} />

      {/* ✅ Floating Action Button for History */}
      {history.length > 0 && !showHistory && (
        <button
          onClick={() => setShowHistory(true)}
          className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 group"
          aria-label="Open History"
        >
          <FiClock className="text-2xl" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full text-xs flex items-center justify-center font-bold">
            {history.length}
          </span>
        </button>
      )}

      {/* ✅ History Sidebar */}
      <HistorySidebar
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onSelect={loadFromHistory}
        onClear={clearHistory}
      />

      <main className="container-custom py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* ✅ Header with Animation */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              {/* <FiSparkles className="text-purple-400 animate-pulse" /> */}
              <span className="text-xs font-medium text-gray-300">AI-Powered Website Builder</span>
            </div>
            
            <h1 className="heading-responsive font-bold mb-4">
              <span className="text-gradient">AI Website Builder</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Describe your dream website and let AI build it for you in seconds
            </p>
            
            {/* ✅ Quick Stats */}
            {history.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <FiCheck className="text-emerald-400" />
                  <span>{stats.totalGenerated} websites generated</span>
                </div>
                {stats.avgTime > 0 && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <FiClock className="text-purple-400" />
                    <span>Avg. {stats.avgTime}ms</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ✅ Controls Section */}
          <div className="glass-morphism rounded-2xl p-6 md:p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <ThemeSelector selected={theme} onChange={setTheme} themes={THEMES} />
              <CategorySelector selected={category} onChange={setCategory} categories={CATEGORIES} />
            </div>
            
            <PromptInput
              ref={inputRef}
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleGenerate}
              loading={loading}
              onExampleClick={() => setShowExamples(!showExamples)}
              showExamples={showExamples}
              examples={EXAMPLE_PROMPTS}
              onSelectExample={useExamplePrompt}
            />
            
            {/* ✅ Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="flex-1 min-w-[140px] px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FiZap className="text-xl group-hover:rotate-12 transition-transform" />
                    <span>Generate Website</span>
                    <span className="hidden sm:inline text-xs opacity-60">(Ctrl+Enter)</span>
                  </>
                )}
              </button>
              
              {generatedHtml && (
                <>
                  <button
                    onClick={handleRegenerate}
                    disabled={loading}
                    className="px-5 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <FiRefreshCw className={`text-lg ${loading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Regenerate</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-5 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <FiTrash2 className="text-lg" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                </>
              )}
            </div>

            {/* ✅ Generation Time & Metadata */}
            {generationTime && (
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 rounded-lg px-4 py-2">
                  <FiClock className="text-purple-400" />
                  <span>Generated in <strong className="text-white">{generationTime}ms</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 rounded-lg px-4 py-2">
                  <span>Theme: <span className="text-white capitalize">{theme}</span></span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 rounded-lg px-4 py-2">
                  <span>Category: <span className="text-white capitalize">{category}</span></span>
                </div>
              </div>
            )}
          </div>

          {/* ✅ Preview Section */}
          <div ref={previewRef}>
            <PreviewSection
              html={generatedHtml}
              loading={loading}
              error={error}
              prompt={prompt}
              onRegenerate={handleRegenerate}
            />
          </div>

          {/* ✅ History Quick Access */}
          {history.length > 0 && !showHistory && (
            <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-300 text-sm font-medium flex items-center gap-2">
                  <FiClock className="text-purple-400" />
                  Recent History
                  <span className="text-xs text-gray-500">({history.length})</span>
                </h3>
                <button
                  onClick={() => setShowHistory(true)}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  View All <FiArrowRight className="text-xs" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.slice(0, 5).map((entry, index) => (
                  <button
                    key={entry.id}
                    onClick={() => loadFromHistory(entry)}
                    className="group px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition-all duration-300 border border-white/10 hover:border-purple-500/30 max-w-xs truncate flex items-center gap-2 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    title={entry.prompt}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:scale-150 transition-transform"></span>
                    {entry.prompt.slice(0, 40)}...
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="mt-16 border-t border-white/5 bg-black/20 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                Built with <FiHeart className="text-pink-500 animate-pulse" /> using
                <span className="text-purple-400">React</span>,
                <span className="text-blue-400">Node.js</span> &
                <span className="text-emerald-400">Gemini AI</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">📧 @Rinku</p>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} AI Website Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;