import React from 'react';
import { FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

const DownloadButton = ({ html, filename = 'website.html' }) => {
  const handleDownload = () => {
    if (!html) {
      toast.error('No content to download');
      return;
    }

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded successfully!');
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg transition-all duration-300"
    >
      <FiDownload />
      Download HTML
    </button>
  );
};

export default DownloadButton;