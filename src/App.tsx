import React, { useState, useEffect } from 'react';
import HeritageExplorer from './components/HeritageExplorer';
import AIChatBot from './components/AIChatBot';
import CameraScanner from './components/CameraScanner';
import ItineraryPlanner from './components/ItineraryPlanner';
import SmartMap from './components/SmartMap';
import SOSCenter from './components/SOSCenter';
import AdminPanel from './components/AdminPanel';
import { HeritageSite } from './types';
import { 
  Compass, Calendar, Camera, Bot, LayoutGrid, Award, 
  Map, ShieldAlert, Settings, Globe, ChevronLeft, 
  Battery, Wifi, Signal, Sparkles, Heart 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [language, setLanguage] = useState<string>('en');
  const [mapInitialSite, setMapInitialSite] = useState<HeritageSite | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  // Track live local time for status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Link Monument Details page click straight to Geofence Map view
  const handleExploreSiteOnMap = (site: HeritageSite) => {
    setMapInitialSite(site);
    setActiveTab('map');
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'explore': return 'Heritage Directory';
      case 'itinerary': return 'Smart AI Planner';
      case 'scanner': return 'AI Vision Scanner';
      case 'assistant': return 'Thambi AI Guide';
      case 'hub': return 'Tourist Hub';
      case 'map': return 'Geofenced Radar Map';
      case 'sos': return 'SOS Safety Center';
      case 'admin': return 'Tourism Admin Console';
      default: return 'Smart Tourism';
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white font-sans flex flex-col items-center justify-center relative overflow-hidden px-2 py-4 md:py-10" id="app-viewport">
      {/* Dynamic ambient glowing radial background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Brand Card on Left side for wide screens */}
      <div className="hidden lg:flex flex-col max-w-sm absolute left-10 top-1/2 -translate-y-1/2 space-y-4" id="desktop-side-banner">
        <div className="bg-gradient-to-b from-amber-500/10 via-white/[0.02] to-transparent border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="bg-amber-500 text-black p-2.5 rounded-xl inline-block shadow-md shadow-amber-500/20 mb-3" id="desktop-brand-logo">
            <Compass className="h-6 w-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-1.5">
            மகா <span className="text-amber-400">Smart TN AI</span>
          </h1>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Smart Heritage Companion</p>
          
          <p className="text-xs text-white/60 mt-4 leading-relaxed">
            Welcome to the mobile-optimized cultural gateway of Tamil Nadu. This high-fidelity simulation showcases live translation, AI itinerary planning, SOS tourist safety dispatch, and geofenced business discovery.
          </p>

          <div className="mt-5 pt-4 border-t border-white/5 space-y-2.5 text-[11px] text-white/40">
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Simulator Mode: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Powered by Gemini 1.5 Pro</span>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-white/25 px-4">
          * Drag, tap, and interact directly. Shrink your browser window to see it seamlessly fit native screen ratios.
        </p>
      </div>

      {/* High-Fidelity Smartphone Chassis Container */}
      <div className="w-full h-screen max-h-screen md:max-h-[820px] md:w-[385px] md:h-[820px] bg-[#0A0A0B] rounded-none md:rounded-[40px] border-0 md:border-[10px] md:border-[#1E1E23] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden relative" id="phone-container">
        
        {/* Native Mobile Status Bar */}
        <div className="bg-[#0A0A0B] text-white text-xs px-5 pt-2 pb-1.5 flex justify-between items-center z-50 shrink-0 select-none h-9" id="mobile-status-bar">
          {/* Time */}
          <div className="text-[11px] font-bold tracking-tight font-mono w-14 text-left" id="status-time">
            {currentTime}
          </div>

          {/* Dynamic Island Pill Notch */}
          <div className="w-24 h-4 bg-black rounded-full shadow-inner flex items-center justify-center relative border border-white/5 mx-auto" id="notch">
            <div className="w-2 h-2 rounded-full bg-[#111116] absolute left-3 border border-white/5" />
          </div>

          {/* System Indicators */}
          <div className="flex items-center space-x-1.5 text-white/80 w-14 justify-end" id="status-icons">
            <Signal className="h-3 w-3" />
            <span className="text-[9px] font-black tracking-tight font-mono">5G</span>
            <Wifi className="h-3 w-3" />
            <Battery className="h-3 w-3 text-emerald-400 fill-emerald-400/20" />
          </div>
        </div>

        {/* Compact Mobile Top Navigation Header */}
        <div className="bg-[#0A0A0B]/95 backdrop-blur-md border-b border-white/10 px-4 py-2 flex items-center justify-between relative z-40 h-12 shrink-0" id="mobile-top-header">
          {['map', 'sos', 'admin'].includes(activeTab) ? (
            <button 
              onClick={() => setActiveTab('hub')}
              className="flex items-center space-x-1 text-xs font-extrabold text-amber-400 hover:text-amber-300 transition cursor-pointer"
              id="top-back-btn"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
              <span>Hub</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5" id="top-logo-box">
              <div className="bg-amber-500 text-black p-1 rounded-lg shadow-md" id="top-logo-badge">
                <Compass className="h-3.5 w-3.5" />
              </div>
              <h1 className="text-[11px] font-bold text-white tracking-tight" id="top-logo-title">
                மகா <span className="text-amber-400 font-extrabold">Smart TN</span>
              </h1>
            </div>
          )}

          <div className="absolute left-1/2 -translate-x-1/2 text-center" id="top-title-box">
            <span className="text-[11px] font-black text-white font-serif uppercase tracking-wider">{getPageTitle()}</span>
          </div>

          <div className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-full px-2.5 py-1" id="top-right-badge">
            <Award className="h-3 w-3 text-amber-500" />
            <span className="text-[9px] font-black text-white/95 font-mono">Lvl 4</span>
          </div>
        </div>

        {/* Flexible Mobile Content viewport */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#0D0D11] relative" id="mobile-content-viewport">
          {activeTab === 'explore' && (
            <HeritageExplorer 
              language={language} 
              onExploreSiteOnMap={handleExploreSiteOnMap} 
            />
          )}

          {activeTab === 'assistant' && (
            <AIChatBot 
              language={language} 
            />
          )}

          {activeTab === 'scanner' && (
            <CameraScanner />
          )}

          {activeTab === 'itinerary' && (
            <ItineraryPlanner />
          )}

          {activeTab === 'map' && (
            <SmartMap 
              initialSelectedSite={mapInitialSite} 
            />
          )}

          {activeTab === 'sos' && (
            <SOSCenter />
          )}

          {activeTab === 'admin' && (
            <AdminPanel />
          )}

          {activeTab === 'hub' && (
            <div className="p-4 space-y-4" id="hub-tab-panel">
              {/* Contributor Card */}
              <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between shadow-md" id="hub-profile-card">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <Award className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
                    <h3 className="font-serif font-bold text-xs text-white">Chola Bronze Contributor</h3>
                  </div>
                  <p className="text-[10px] text-white/50">Level 4 Ambassador • 1,420 XP</p>
                  
                  {/* Progress bar */}
                  <div className="w-36 h-1.5 bg-white/10 rounded-full overflow-hidden mt-1.5" id="profile-progress-bar">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '71%' }} />
                  </div>
                  <p className="text-[8px] text-amber-400 font-bold mt-1">Verify 3 more craft shops to unlock Level 5!</p>
                </div>

                {/* Level Avatar badge */}
                <div className="h-10 w-10 bg-amber-500 text-black font-serif font-extrabold text-sm rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20" id="profile-avatar">
                  IV
                </div>
              </div>

              {/* Grid of mobile-only features */}
              <div className="grid grid-cols-1 gap-3" id="hub-grid-actions">
                {/* Smart Discovery Radar */}
                <button
                  onClick={() => setActiveTab('map')}
                  className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-start space-x-3.5 hover:bg-white/10 transition text-left cursor-pointer border-l-4 border-l-amber-500"
                  id="hub-map-card"
                >
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl text-amber-400 shrink-0">
                    <Map className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white flex items-center gap-1.5 font-serif">
                      Smart Discovery Map <span className="bg-amber-500/15 text-amber-400 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider font-mono border border-amber-500/10">Radar</span>
                    </h4>
                    <p className="text-[10px] text-white/40 mt-1 leading-normal">Locate local craft shops, registered history guides, and regional restaurants around monuments.</p>
                  </div>
                </button>

                {/* SOS Emergency dispatch */}
                <button
                  onClick={() => setActiveTab('sos')}
                  className="bg-red-500/5 border border-red-500/10 rounded-2xl p-3.5 flex items-start space-x-3.5 hover:bg-red-500/10 transition text-left cursor-pointer border-l-4 border-l-red-500"
                  id="hub-sos-card"
                >
                  <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-xl text-red-400 shrink-0 animate-pulse">
                    <ShieldAlert className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-red-400 flex items-center gap-1.5 font-serif">
                      SOS Emergency Center <span className="bg-red-500/15 text-red-400 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider font-mono border border-red-500/10">Active</span>
                    </h4>
                    <p className="text-[10px] text-white/40 mt-1 leading-normal">Broadcast coordinates instantly, contact state tourist security helpline, and locate hospitals.</p>
                  </div>
                </button>

                {/* Authority Console Panel */}
                <button
                  onClick={() => setActiveTab('admin')}
                  className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-start space-x-3.5 hover:bg-white/10 transition text-left cursor-pointer border-l-4 border-l-slate-500"
                  id="hub-admin-card"
                >
                  <div className="bg-slate-500/10 border border-white/5 p-2 rounded-xl text-slate-300 shrink-0">
                    <Settings className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white font-serif">Department Admin Console</h4>
                    <p className="text-[10px] text-white/40 mt-1 leading-normal">Validate cooperative registries, approve community reviews, and inspect token quotas.</p>
                  </div>
                </button>
              </div>

              {/* Language Selection Grid */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5" id="hub-language-card">
                <h4 className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-white/40" /> Choose Companion Language
                </h4>
                <div className="grid grid-cols-2 gap-2" id="hub-lang-grid">
                  {[
                    { code: 'en', label: '🇬🇧 English' },
                    { code: 'ta', label: '🇮🇳 தமிழ்' },
                    { code: 'ur', label: '🇵🇰/🇮🇳 اردو' },
                    { code: 'hi', label: '🇮🇳 हिन्दी' },
                    { code: 'ml', label: '🇮🇳 മലയാളം' },
                    { code: 'es', label: '🇪🇸 Español' },
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`py-2 px-3 rounded-xl text-[10.5px] font-bold transition flex items-center justify-between border cursor-pointer ${
                        language === lang.code
                          ? 'bg-amber-500 border-amber-500 text-black'
                          : 'bg-[#0A0A0B]/60 border-white/10 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Premium Mobile Bottom Navigation Bar */}
        <div className="bg-[#0A0A0B]/95 border-t border-white/10 px-4 py-2 flex justify-around items-end relative z-40 shrink-0 h-15 select-none" id="mobile-bottom-tabs">
          {/* Tab: Explore */}
          <button 
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center justify-center pb-1 transition-all flex-1 cursor-pointer ${
              activeTab === 'explore' ? 'text-amber-400 scale-105' : 'text-white/40 hover:text-white'
            }`}
            id="tab-btn-explore"
          >
            <Compass className="h-5 w-5 mb-0.5" />
            <span className="text-[9px] font-bold tracking-tight">Explore</span>
          </button>

          {/* Tab: Planner */}
          <button 
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center justify-center pb-1 transition-all flex-1 cursor-pointer ${
              activeTab === 'itinerary' ? 'text-amber-400 scale-105' : 'text-white/40 hover:text-white'
            }`}
            id="tab-btn-itinerary"
          >
            <Calendar className="h-5 w-5 mb-0.5" />
            <span className="text-[9px] font-bold tracking-tight">AI Planner</span>
          </button>

          {/* Tab: Scanner (Protruding Central Glowing Button) */}
          <div className="relative -top-3 px-1" id="tab-btn-scanner-wrapper">
            <button 
              onClick={() => setActiveTab('scanner')}
              className={`h-13 w-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
                activeTab === 'scanner' 
                  ? 'bg-amber-400 text-black shadow-amber-500/35 ring-4 ring-amber-400/20' 
                  : 'bg-gradient-to-tr from-amber-600 to-amber-400 text-black shadow-amber-600/20 hover:scale-105 active:scale-95'
              }`}
              id="tab-btn-scanner"
              title="AI Scanner"
            >
              <Camera className="h-5.5 w-5.5" />
            </button>
          </div>

          {/* Tab: Assistant */}
          <button 
            onClick={() => setActiveTab('assistant')}
            className={`flex flex-col items-center justify-center pb-1 transition-all flex-1 cursor-pointer ${
              activeTab === 'assistant' ? 'text-amber-400 scale-105' : 'text-white/40 hover:text-white'
            }`}
            id="tab-btn-assistant"
          >
            <Bot className="h-5 w-5 mb-0.5" />
            <span className="text-[9px] font-bold tracking-tight">Thambi AI</span>
          </button>

          {/* Tab: Hub Menu */}
          <button 
            onClick={() => setActiveTab('hub')}
            className={`flex flex-col items-center justify-center pb-1 transition-all flex-1 cursor-pointer ${
              ['hub', 'map', 'sos', 'admin'].includes(activeTab) ? 'text-amber-400 scale-105' : 'text-white/40 hover:text-white'
            }`}
            id="tab-btn-hub"
          >
            <LayoutGrid className="h-5 w-5 mb-0.5" />
            <span className="text-[9px] font-bold tracking-tight">Hub Menu</span>
          </button>
        </div>

        {/* Safe Area Home Indicator Bar (Apple styled) */}
        <div className="bg-[#0A0A0B] pb-1.5 pt-0.5 z-40 shrink-0 select-none" id="mobile-safe-bar">
          <div className="w-28 h-1 bg-white/20 rounded-full mx-auto" />
        </div>

      </div>

      {/* Decorative Brand Footer Card on bottom right for wide screens */}
      <p className="hidden lg:block text-[10px] text-white/30 font-medium absolute right-10 bottom-10" id="desktop-footer-credit">
        © 2026 Smart Tourism Council. Made with <Heart className="h-3 w-3 text-red-500 fill-red-500 inline inline-block mx-0.5" /> in Tamil Nadu.
      </p>
    </div>
  );
}

