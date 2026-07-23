import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, RefreshCw } from 'lucide-react';

interface VoiceGuidePlayerProps {
  textToRead: string;
  title: string;
  lang?: string;
}

export default function VoiceGuidePlayer({ textToRead, title, lang = 'en' }: VoiceGuidePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(true);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    } else {
      setHasVoiceSupport(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    if (!synthRef.current || !hasVoiceSupport) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    // Cancel any ongoing speaking
    synthRef.current.cancel();

    // Clean up text: Strip HTML or markdown headings
    const cleanedText = textToRead
      .replace(/[\#\*\_]/g, '')
      .replace(/\[.*?\]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    
    // Choose appropriate voice/locale based on active language
    let targetLangCode = 'en-IN';
    if (lang === 'ta') {
      targetLangCode = 'ta-IN';
    } else if (lang === 'ur') {
      targetLangCode = 'ur-IN';
    } else if (lang === 'hi') {
      targetLangCode = 'hi-IN';
    } else if (lang === 'ml') {
      targetLangCode = 'ml-IN';
    } else if (lang === 'es') {
      targetLangCode = 'es-ES';
    } else {
      targetLangCode = 'en-IN';
    }

    utterance.lang = targetLangCode;

    // Try finding exact matching voice in browser synthesizer
    const voices = synthRef.current.getVoices();
    const matchingVoice = voices.find(v => 
      v.lang.toLowerCase() === targetLangCode.toLowerCase() || 
      v.lang.toLowerCase().startsWith(lang.toLowerCase())
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = speechRate;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
    if (isPlaying) {
      // Re-trigger with new rate
      setTimeout(() => handlePlay(), 100);
    }
  };

  if (!hasVoiceSupport) {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center text-xs text-slate-500" id="voice-no-support">
        <VolumeX className="h-5 w-5 text-slate-400 mx-auto mb-1" />
        Text-to-speech audio guide is not supported by your browser.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-5 shadow-lg shadow-amber-600/20" id="voice-guide-player">
      <div className="flex items-center justify-between mb-4" id="voice-header">
        <div className="flex items-center space-x-2.5">
          <div className="bg-white/20 p-2 rounded-lg" id="voice-icon-box">
            <Volume2 className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-100">AI Audio Narrator</h4>
            <h3 className="text-sm font-bold text-white truncate max-w-[180px]">{title}</h3>
          </div>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="flex items-end space-x-1 h-6" id="audio-visualizer">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-amber-100 rounded-full transition-all duration-300"
              style={{
                height: isPlaying ? `${Math.floor(Math.random() * 20) + 6}px` : '4px',
                animation: isPlaying ? `bounce 1s ease-in-out infinite alternate` : 'none',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between" id="voice-controls-row">
        {/* Play/Pause Buttons */}
        <div className="flex items-center space-x-2" id="voice-button-group">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="flex items-center space-x-1.5 bg-white text-amber-700 hover:bg-amber-50 font-bold text-xs py-2 px-4 rounded-xl shadow-sm transition-all active:scale-95"
              id="voice-play"
            >
              <Play className="h-4 w-4 fill-amber-700" />
              <span>{isPaused ? 'Resume Guide' : 'Listen Guide'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center space-x-1.5 bg-white/20 hover:bg-white/35 text-white font-bold text-xs py-2 px-4 rounded-xl transition-all active:scale-95"
              id="voice-pause"
            >
              <Pause className="h-4 w-4 fill-white" />
              <span>Pause</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="p-2 bg-red-500/80 hover:bg-red-500 hover:text-white rounded-xl text-red-100 transition-all active:scale-95"
              title="Stop Narration"
              id="voice-stop"
            >
              <Square className="h-4 w-4 fill-current" />
            </button>
          )}
        </div>

        {/* Speed controls */}
        <div className="flex items-center space-x-1 bg-black/10 rounded-xl p-1 text-xs" id="voice-speed-controls">
          <span className="text-[10px] text-amber-100 font-semibold px-1">Speed:</span>
          {[0.8, 1.0, 1.25].map((rate) => (
            <button
              key={rate}
              onClick={() => handleRateChange(rate)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                speechRate === rate
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-amber-100 hover:bg-white/10'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
