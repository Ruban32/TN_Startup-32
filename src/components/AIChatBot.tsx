import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, AlertCircle, RefreshCw, Globe } from 'lucide-react';

interface AIChatBotProps {
  language: string;
}

export default function AIChatBot({ language }: AIChatBotProps) {
  const [activeLang, setActiveLang] = useState<string>(language || 'en');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: 'Vanakkam! I am Thambi, your AI Cultural Ambassador for Tamil Nadu. 🛕 I can speak English, Tamil, Urdu, Hindi, Malayalam, and Spanish! How may I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Sync prop changes
  useEffect(() => {
    if (language) {
      setActiveLang(language);
    }
  }, [language]);

  const SUPPORTED_LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧', locale: 'en-IN' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳', locale: 'ta-IN' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰', locale: 'ur-IN' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', locale: 'hi-IN' },
    { code: 'ml', label: 'മലയാളം', flag: '🇮🇳', locale: 'ml-IN' },
    { code: 'es', label: 'Español', flag: '🇪🇸', locale: 'es-ES' }
  ];

  // Quick Action Prompts
  const PRESET_PROMPTS = [
    { label: '🛕 Chola Architecture', text: 'Tell me about the architectural genius of the Chola Dynasty Tanjore temple.' },
    { label: '🎭 Local Crafts', text: 'What are the famous handicrafts of Tamil Nadu and where can I buy Tanjore art plates?' },
    { label: '🌶️ Traditional Cuisines', text: 'Recommend iconic Madurai or Chettinad traditional foods I must try.' },
    { label: '🚨 SOS Contacts', text: 'I need local emergency assistance numbers, hospitals, or tourist police in Chennai.' }
  ];

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle Speech-to-Text Initialization for current active language
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        
        const langObj = SUPPORTED_LANGUAGES.find(l => l.code === activeLang);
        rec.lang = langObj ? langObj.locale : 'en-IN';

        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onresult = (e: any) => {
          const transcript = e.results[0][0].transcript;
          setInputValue(prev => (prev + ' ' + transcript).trim());
        };
        rec.onerror = (e: any) => {
          console.warn('Speech recognition error:', e);
          setIsListening(false);
        };
        recognitionRef.current = rec;
      }
    }
  }, [activeLang]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech-to-text is not supported in this browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Speaks text aloud using client-side TTS in active language
  const speakText = (text: string) => {
    if (!isTtsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const cleanedText = text
      .replace(/[\#\*\_]/g, '')
      .replace(/\[.*?\]/g, '')
      .slice(0, 320); // Speak first 320 chars

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === activeLang);
    const targetLocale = langObj ? langObj.locale : 'en-IN';
    utterance.lang = targetLocale;

    // Pick matching browser voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => 
      v.lang.toLowerCase() === targetLocale.toLowerCase() ||
      v.lang.toLowerCase().startsWith(activeLang.toLowerCase())
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const finalQuery = textToSend || inputValue;
    if (!finalQuery.trim() || isLoading) return;

    if (!textToSend) {
      setInputValue('');
    }

    // Append User Message
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: finalQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Send chat request to our Express backend proxy
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: finalQuery,
          history: messages.slice(-6),
          language: activeLang
        })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: 'reply_' + Date.now(),
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      
      // Trigger voice guide read back
      speakText(data.text);

      // Increment admin chatbot queries count
      const adminAnalytics = JSON.parse(localStorage.getItem('tn_admin_analytics') || '{"chatbotQueries": 120}');
      localStorage.setItem('tn_admin_analytics', JSON.stringify({
        ...adminAnalytics,
        chatbotQueries: (adminAnalytics.chatbotQueries || 120) + 1
      }));

    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: 'err_' + Date.now(),
        sender: 'assistant',
        text: 'Vanakkam! I had trouble connecting to the cultural knowledge base. Please check if your server is running or configure GEMINI_API_KEY in the secrets settings panel.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    if (window.confirm('Do you want to reset the conversation?')) {
      const activeObj = SUPPORTED_LANGUAGES.find(l => l.code === activeLang);
      setMessages([
        {
          id: 'init',
          sender: 'assistant',
          text: `Vanakkam! I am Thambi, your AI Cultural Ambassador for Tamil Nadu. 🛕 Currently set to speak in ${activeObj?.label || 'English'}. How may I help you?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full p-2 text-white overflow-hidden" id="chatbot-root">
      {/* Upper header controls */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-sm shadow-md mb-2 shrink-0 space-y-2" id="chatbot-header">
        <div className="flex justify-between items-center" id="chatbot-header-top">
          <div className="flex items-center space-x-2" id="chatbot-title-box">
            <div className="bg-amber-500 p-1.5 rounded-xl text-black shadow-md shadow-amber-500/10 shrink-0" id="thambi-avatar-header">
              <Bot className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-xs text-white flex items-center gap-1 font-serif">
                Thambi AI <span className="bg-green-500/15 text-green-400 text-[8px] font-bold py-0.5 px-1.5 rounded-full uppercase tracking-wider border border-green-500/20">Voice AI</span>
              </h3>
              <p className="text-[8.5px] text-white/40 truncate">Speaks 6 Languages Fluently</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5" id="chatbot-settings-box">
            {/* TTS Read Aloud toggle */}
            <button
              onClick={() => {
                setIsTtsEnabled(!isTtsEnabled);
                if (isTtsEnabled && typeof window !== 'undefined') {
                  window.speechSynthesis?.cancel();
                }
              }}
              className={`p-1.5 rounded-xl transition cursor-pointer border ${
                isTtsEnabled 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                  : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              title={isTtsEnabled ? 'Disable Voice Speech' : 'Enable Voice Speech'}
              id="toggle-chatbot-tts"
            >
              {isTtsEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>

            {/* Reset button */}
            <button
              onClick={clearChatHistory}
              className="p-1.5 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 text-white/40 rounded-xl transition cursor-pointer"
              title="Reset Chat History"
              id="reset-chat-btn"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Language Selection Pills Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none pt-0.5 border-t border-white/5" id="chatbot-language-pills">
          <span className="text-[8.5px] font-bold text-white/40 uppercase tracking-wider shrink-0 flex items-center gap-0.5 pr-1">
            <Globe className="h-2.5 w-2.5" /> Lang:
          </span>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveLang(lang.code)}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition whitespace-nowrap cursor-pointer border ${
                activeLang === lang.code
                  ? 'bg-amber-500 text-black border-amber-500 font-black shadow-sm'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              id={`lang-pill-${lang.code}`}
            >
              <span className="mr-1">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body Container */}
      <div className="flex-1 bg-black/40 rounded-2xl border border-white/10 p-3 overflow-y-auto mb-2 space-y-3 shadow-inner min-h-0" id="chat-messages-container">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              id={`chat-bubble-${msg.id}`}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[85%] space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                {/* Small circular icon */}
                <div className={`p-1.5 rounded-lg shrink-0 shadow-sm border ${isUser ? 'bg-amber-500 text-black border-amber-500' : 'bg-white/5 text-amber-400 border-white/10'}`} id={`bubble-avatar-${msg.id}`}>
                  <Bot className="h-3.5 w-3.5" />
                </div>

                {/* Message Bubble Card */}
                <div className={`rounded-2xl p-3 text-xs shadow-sm leading-relaxed border ${
                  isUser 
                    ? 'bg-amber-500 text-black border-amber-500 rounded-tr-none font-bold' 
                    : 'bg-white/5 text-white border-white/10 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[8px] text-right mt-1 ${isUser ? 'text-black/60 font-medium' : 'text-white/40'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator state */}
        {isLoading && (
          <div className="flex justify-start items-center space-x-2 text-xs text-white/40 italic pl-6" id="typing-indicator">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Thambi is formulating reply in {SUPPORTED_LANGUAGES.find(l => l.code === activeLang)?.label}...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action prompts list */}
      <div className="flex space-x-1.5 overflow-x-auto pb-2 scrollbar-none" id="quick-presets-row">
        {PRESET_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            id={`preset-prompt-${i}`}
            onClick={() => handleSendMessage(prompt.text)}
            className="flex-shrink-0 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500 hover:text-white text-white/80 text-[9.5px] font-bold py-1 px-2.5 rounded-full transition shadow-sm cursor-pointer whitespace-nowrap"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Input panel row */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-2 shadow-xl backdrop-blur-sm flex items-center space-x-2" id="chatbot-input-panel">
        <input
          id="chat-text-input"
          type="text"
          placeholder={`Ask Thambi in ${SUPPORTED_LANGUAGES.find(l => l.code === activeLang)?.label || 'English'}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 bg-[#0A0A0B]/80 border border-white/10 text-white placeholder-white/30 rounded-xl py-2 px-3 text-xs outline-none focus:border-amber-500 focus:bg-[#0A0A0B] transition"
        />

        {/* Speech-to-Text Voice Mic toggle */}
        <button
          onClick={toggleListening}
          className={`p-2 rounded-xl transition cursor-pointer border ${
            isListening 
              ? 'bg-red-500 border-red-500 text-white animate-bounce shadow-lg shadow-red-500/20' 
              : 'bg-[#0A0A0B]/80 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
          }`}
          title={isListening ? 'Stop Speech Capture' : `Speak in ${SUPPORTED_LANGUAGES.find(l => l.code === activeLang)?.label}`}
          id="chatbot-mic-btn"
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>

        {/* Send message button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isLoading}
          className="p-2 bg-amber-500 hover:bg-amber-600 disabled:bg-white/5 disabled:text-white/20 text-black font-extrabold rounded-xl shadow-lg shadow-amber-500/10 transition active:scale-95 cursor-pointer disabled:cursor-not-allowed border-none"
          id="send-message-btn"
        >
          <Send className="h-4 w-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
