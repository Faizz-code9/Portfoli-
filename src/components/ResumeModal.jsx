import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Share2, ExternalLink, Download } from 'lucide-react';
import { heroData } from '../data/portfolioData';

export function ResumeModal({ isOpen, onClose }) {
  const [activeDoc, setActiveDoc] = useState('resume'); // 'resume' | 'cv'

  // Close on Escape key press and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const docs = {
    resume: {
      title: 'Resume',
      type: 'PDF • Technical Format',
      url: heroData.resumeUrl,
    },
    cv: {
      title: 'Curriculum Vitae',
      type: 'PDF • Complete CV with Photo',
      url: heroData.cvUrl,
    },
  };

  const current = docs[activeDoc];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mohammed Faizan - ${current.title}`,
          url: window.location.origin + current.url,
        });
      } catch (err) {
        window.open(current.url, '_blank');
      }
    } else {
      window.open(current.url, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* ─── Main White Document Preview Card (Matches User Screenshot) ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-lg rounded-[32px] bg-white text-gray-900 p-5 sm:p-7 shadow-2xl shadow-black/90 flex flex-col items-center my-auto"
          >
            {/* Header: Document Title & PDF Subtitle */}
            <div className="text-center w-full">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                {current.title}
              </h3>
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium mt-0.5">
                <FileText size={13} className="text-gray-400" />
                <span>{current.type}</span>
              </div>

              {/* Document Switcher Tabs */}
              <div className="flex items-center justify-center gap-2 mt-3 mb-2 p-1 bg-gray-100 rounded-full max-w-xs mx-auto">
                <button
                  onClick={() => setActiveDoc('resume')}
                  className={`flex-1 py-1 px-3 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    activeDoc === 'resume'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Technical Resume
                </button>
                <button
                  onClick={() => setActiveDoc('cv')}
                  className={`flex-1 py-1 px-3 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    activeDoc === 'cv'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Complete CV
                </button>
              </div>
            </div>

            {/* Embedded Live PDF Document Viewer */}
            <div className="w-full h-[440px] sm:h-[480px] rounded-2xl bg-[#FAFAFA] border border-gray-200 mt-2 overflow-hidden shadow-inner relative">
              <iframe
                src={`${current.url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                title={`${current.title} Preview`}
                className="w-full h-full border-0 rounded-2xl bg-white"
              />
            </div>
          </motion.div>

          {/* ─── Bottom Floating Action Bar (View, Share, Close) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative z-10 flex items-center justify-center gap-3 mt-4"
          >
            {/* View Fullscreen / Open in Tab Button */}
            <a
              href={current.url}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 rounded-full bg-black hover:bg-gray-900 text-white font-semibold text-sm shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
            >
              View
            </a>

            {/* Direct Download Button */}
            <a
              href={current.url}
              download={activeDoc === 'resume' ? 'Mohammed_Faizan_Resume.pdf' : 'Mohammed_Faizan_CV_Photo.pdf'}
              aria-label="Download document"
              title="Download PDF"
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download size={19} />
            </a>

            {/* Share / Open Button */}
            <button
              onClick={handleShare}
              aria-label="Share resume link"
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Share2 size={19} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <X size={22} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
