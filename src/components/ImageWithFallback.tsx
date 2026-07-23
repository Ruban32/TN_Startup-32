import React, { useState } from 'react';
import { ImageOff, ZoomIn } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  onExpand?: () => void;
  showExpandOverlay?: boolean;
}

// High-resolution reliable fallback images for Tamil Nadu Heritage
const DEFAULT_FALLBACKS = [
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200', // Ancient Temple
  'https://images.unsplash.com/photo-1600100397990-24b32252c431?auto=format&fit=crop&q=80&w=1200', // Heritage Monument
  'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200', // Dravidian Carving
  'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200'  // Gopuram Tower
];

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  onExpand,
  showExpandOverlay = true,
  onClick,
  ...props
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Candidates list: primary src, fallbackSrc, and default reliable unsplash photos
  const candidates = [
    src,
    fallbackSrc,
    ...DEFAULT_FALLBACKS
  ].filter((url): url is string => Boolean(url && typeof url === 'string' && url.trim().length > 0));

  const currentSrc = candidates[currentSrcIndex] || DEFAULT_FALLBACKS[0];

  const handleError = () => {
    if (currentSrcIndex < candidates.length - 1) {
      setCurrentSrcIndex(prev => prev + 1);
    } else {
      setIsError(true);
      setLoading(false);
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onExpand) {
      e.stopPropagation();
      onExpand();
    } else if (onClick) {
      onClick(e as any);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden group ${onExpand ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleContainerClick}
    >
      {/* Loading Skeleton */}
      {loading && !isError && (
        <div className="absolute inset-0 bg-white/10 animate-pulse flex items-center justify-center z-10">
          <span className="text-[10px] font-bold text-amber-400/70 tracking-widest uppercase">Loading photo...</span>
        </div>
      )}

      {!isError ? (
        <img
          src={currentSrc}
          alt={alt || 'Tamil Nadu Heritage Monument'}
          onError={handleError}
          onLoad={handleLoad}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-300 ${
            loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-stone-900 border border-white/10 flex flex-col items-center justify-center p-3 text-center">
          <ImageOff className="h-6 w-6 text-amber-500/60 mb-1" />
          <span className="text-[11px] font-semibold text-white/80 line-clamp-1">{alt || 'Heritage Site'}</span>
          <span className="text-[9px] text-amber-400/60 font-sans mt-0.5">Tamil Nadu Heritage Visual</span>
        </div>
      )}

      {/* Clear View Zoom Overlay */}
      {showExpandOverlay && !isError && onExpand && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-amber-500 text-black px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <ZoomIn className="h-3.5 w-3.5" />
            <span>Clear HD View</span>
          </div>
        </div>
      )}
    </div>
  );
};
