import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  title?: string;
  onNavigate?: (newIndex: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  title = 'Heritage Site High-Resolution View',
  onNavigate
}) => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(currentIndex);

  useEffect(() => {
    setActiveIdx(currentIndex);
    setZoom(1);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIdx, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[activeIdx] || images[0];

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % images.length;
    setActiveIdx(nextIdx);
    setZoom(1);
    if (onNavigate) onNavigate(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + images.length) % images.length;
    setActiveIdx(prevIdx);
    setZoom(1);
    if (onNavigate) onNavigate(prevIdx);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 0.75));
  const handleResetZoom = () => setZoom(1);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white animate-fadeIn"
      id="lightbox-modal-root"
    >
      {/* Top Controls Header */}
      <div className="flex items-center justify-between z-10 border-b border-white/10 pb-3" id="lightbox-header">
        <div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-amber-400 leading-tight">
            {title}
          </h3>
          <p className="text-xs text-white/60 font-mono mt-0.5">
            Image {activeIdx + 1} of {images.length} • Clear High-Definition View
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2" id="lightbox-controls">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-2 bg-white/10 hover:bg-amber-500 hover:text-black rounded-xl transition text-white"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-2 bg-white/10 hover:bg-amber-500 hover:text-black rounded-xl transition text-white"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset Scale"
            className="p-2 bg-white/10 hover:bg-amber-500 hover:text-black rounded-xl transition text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-2 bg-white/10 hover:bg-amber-500 hover:text-black rounded-xl transition text-white hidden sm:block"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-amber-500 text-black hover:bg-amber-400 rounded-xl font-bold transition flex items-center gap-1 text-xs"
            id="close-lightbox-btn"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Center Image Display Canvas */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4" id="lightbox-viewport">
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white transition border border-white/20 shadow-2xl backdrop-blur-sm"
            id="lightbox-prev-btn"
            title="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div className="max-w-full max-h-full flex items-center justify-center overflow-auto p-2">
          <img
            src={currentImage}
            alt={title}
            referrerPolicy="no-referrer"
            style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease-out' }}
            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            id="lightbox-main-img"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white transition border border-white/20 shadow-2xl backdrop-blur-sm"
            id="lightbox-next-btn"
            title="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 border-t border-white/10" id="lightbox-thumbnails">
          {images.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setZoom(1);
                if (onNavigate) onNavigate(idx);
              }}
              className={`relative h-14 w-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                activeIdx === idx
                  ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/20 ring-2 ring-amber-500/50'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
