import React, { useState, useEffect } from 'react';
import { 
  FiDownload, 
  FiCopy, 
  FiCheck, 
  FiMaximize2, 
  FiMinimize2,
  FiEye,
  FiEyeOff,
  FiAlertTriangle,
  FiCode
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PreviewSection = ({ html, loading, error, prompt, onRegenerate }) => {
  const [showCode, setShowCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // ✅ Check HTML completeness
  const isComplete = html?.includes('</html>');
  const isCSSOnly = html?.includes(':root') && !html?.includes('<html>');
  const isIncomplete = html && !isComplete;
  const hasHtml = html && html.length > 0;

  // ✅ Debug log when html changes
  useEffect(() => {
    if (html) {
      console.log('📄 Preview received HTML length:', html.length);
      console.log('📄 HTML preview (first 200 chars):', html.substring(0, 200));
      console.log('📄 Has DOCTYPE?', html.includes('<!DOCTYPE'));
      console.log('📄 Has <style>?', html.includes('<style>'));
      console.log('📄 Has <body>?', html.includes('<body>'));
      console.log('📄 Has </html>?', html.includes('</html>'));
      
      if (isCSSOnly) {
        console.warn('⚠️ Response appears to be CSS-only!');
        toast.error('⚠️ Incomplete response received. Click Regenerate.');
      }
      
      if (isIncomplete) {
        console.warn('⚠️ Response is incomplete - missing </html>');
        toast('⚠️ Website generation was cut off. Try regenerating.', {
          icon: '✂️',
          duration: 4000,
        });
      }
    }
  }, [html, isCSSOnly, isIncomplete]);

  const handleDownload = () => {
    if (!html) return;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('📥 Website downloaded successfully!');
  };

  const handleCopy = async () => {
    if (!html) return;
    
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast.success('📋 Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const toggleFullscreen = () => {
    const preview = document.getElementById('preview-container');
    if (!document.fullscreenElement) {
      preview?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleIframeError = () => {
    setIframeError(true);
    toast.error('⚠️ Failed to load preview. Try downloading the HTML.');
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="glass-morphism rounded-2xl p-12 text-center">
        <LoadingSpinner size="lg" />
        <p className="text-gray-300 mt-6 text-lg">Building your website...</p>
        <p className="text-gray-500 text-sm">This may take a few seconds</p>
        <div className="mt-4 flex justify-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="glass-morphism rounded-2xl p-12 text-center border-red-500/20">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-red-400 text-xl font-semibold mb-2">Generation Failed</h3>
        <p className="text-gray-400 max-w-md mx-auto">{error}</p>
        <button
          onClick={onRegenerate}
          className="mt-6 px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ✅ Empty State
  if (!html) {
    return (
      <div className="glass-morphism rounded-2xl p-12 text-center border-dashed border-2 border-white/10">
        <div className="text-7xl mb-4">🚀</div>
        <h3 className="text-gray-300 text-2xl font-semibold mb-2">Ready to Create</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Describe your website above and click "Generate Website" to see the magic happen
        </p>
        <div className="mt-6 p-4 bg-white/5 rounded-xl max-w-lg mx-auto">
          <p className="text-gray-400 text-sm">💡 Try: "Create a modern portfolio website for a photographer with a gallery and contact form"</p>
        </div>
      </div>
    );
  }

  // ✅ CSS-Only Response - Show buttons too
  if (isCSSOnly) {
    return (
      <div className="space-y-4">
        {/* Warning */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <div className="text-5xl mb-3">⚠️</div>
          <h3 className="text-red-400 text-lg font-semibold mb-2">CSS-Only Response</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            The AI returned only CSS styles. This usually means the response was incomplete.
          </p>
          <button
            onClick={onRegenerate}
            className="mt-4 px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
          >
            Regenerate
          </button>
        </div>
        
        {/* ✅ Buttons - ALWAYS SHOW */}
        <div className="flex flex-wrap gap-3 items-center justify-between glass-morphism rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <FiDownload />
              Download HTML
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              {copied ? <FiCheck /> : <FiCopy />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              {showCode ? <FiEyeOff /> : <FiEye />}
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
          </div>
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
        
        {/* Show CSS */}
        <div className="glass-morphism rounded-2xl overflow-hidden">
          <div className="p-4 max-h-[400px] overflow-auto">
            <SyntaxHighlighter
              language="css"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'Consolas, monospace',
              }}
            >
              {html}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }

  // ✅ MAIN PREVIEW - Buttons ALWAYS SHOW
  return (
    <div className="space-y-4">
      {/* ✅ Incomplete Warning */}
      {isIncomplete && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-yellow-400 text-sm flex items-start gap-3">
          <FiAlertTriangle className="text-xl flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Incomplete Website Generated</p>
            <p className="text-gray-400 text-xs">
              The response was cut off before completion. 
              <button
                onClick={onRegenerate}
                className="ml-2 text-purple-400 hover:text-purple-300 underline"
              >
                Click here to regenerate
              </button>
              {' '}or download what was generated.
            </p>
          </div>
        </div>
      )}

      {/* ✅ BUTTONS - ALWAYS SHOW when html exists */}
      <div className="flex flex-wrap gap-3 items-center justify-between glass-morphism rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <FiDownload />
            Download HTML
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            {copied ? <FiCheck /> : <FiCopy />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            {showCode ? <FiEyeOff /> : <FiEye />}
            {showCode ? 'Hide Code' : 'View Code'}
          </button>
          {isIncomplete && (
            <button
              onClick={onRegenerate}
              className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <FiCode />
              Regenerate
            </button>
          )}
        </div>
        <button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      {/* ✅ Preview Container */}
      <div id="preview-container" className="glass-morphism rounded-2xl overflow-hidden">
        {showCode ? (
          <div className="p-4 max-h-[600px] overflow-auto">
            <SyntaxHighlighter
              language="html"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'Consolas, monospace',
              }}
              showLineNumbers
            >
              {html}
            </SyntaxHighlighter>
          </div>
        ) : (
          <iframe
            srcDoc={html}
            title="Website Preview"
            className="w-full min-h-[600px] bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
            loading="lazy"
            onError={handleIframeError}
          />
        )}
      </div>

      {/* ✅ Iframe Error Fallback */}
      {iframeError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center gap-3">
          <span className="text-2xl">🔄</span>
          <div>
            <p className="font-semibold">Preview Failed to Load</p>
            <p className="text-gray-400 text-xs">The HTML couldn't be displayed. Try downloading the file instead.</p>
          </div>
        </div>
      )}

      {/* ✅ Metadata */}
      {prompt && (
        <div className="text-sm text-gray-400 glass-morphism rounded-xl p-3 flex items-start gap-2">
          <span className="font-medium text-purple-400 whitespace-nowrap">📝 Prompt:</span>
          <span className="text-gray-300">{prompt}</span>
        </div>
      )}

      {/* ✅ Stats */}
      {html && (
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 glass-morphism rounded-xl p-3">
          <span>📄 Size: {(html.length / 1024).toFixed(1)} KB</span>
          <span>📊 Lines: {html.split('\n').length}</span>
          <span>✅ Complete: {isComplete ? 'Yes' : 'No'}</span>
          {isComplete && <span className="text-emerald-400">✓ Ready to use</span>}
        </div>
      )}
    </div>
  );
};

export default PreviewSection;