import React from 'react';
import { Compass, Bot, Camera, Calendar, Map, ShieldAlert, Settings, Globe, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export default function Navbar({ activeTab, setActiveTab, language, setLanguage }: NavbarProps) {
  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'assistant', label: 'Thambi AI Guide', icon: Bot },
    { id: 'scanner', label: 'AI Scanner', icon: Camera },
    { id: 'itinerary', label: 'AI Planner', icon: Calendar },
    { id: 'map', label: 'Smart Map', icon: Map },
    { id: 'sos', label: 'SOS Safety', icon: ShieldAlert },
    { id: 'admin', label: 'Dashboard', icon: Settings },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'zh', label: '中文' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 shadow-lg text-white" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('explore')} id="header-brand">
            <div className="bg-amber-500 text-black p-2 rounded-xl shadow-md shadow-amber-500/20" id="header-logo">
              <Compass className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5" id="brand-title">
                மகா <span className="text-amber-400">Smart Tamil Nadu AI</span>
              </h1>
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest" id="brand-subtitle">Smart Tourism & Heritage</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1" id="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-white/40'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Area - Language & Contribution */}
          <div className="flex items-center space-x-4" id="header-right">
            {/* Language Dropdown */}
            <div className="relative flex items-center space-x-1" id="language-container">
              <Globe className="h-4 w-4 text-white/40" />
              <select
                id="language-selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white/80 hover:text-white border-none outline-none cursor-pointer pr-1"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0A0A0B] text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Badges and Profile level */}
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full py-1.5 px-3" id="profile-badge">
              <Award className="h-4 w-4 text-amber-500" />
              <div className="text-left leading-none" id="contributor-rank">
                <span className="block text-[9px] text-white/40 uppercase font-bold">Chola Bronze</span>
                <span className="text-[11px] font-extrabold text-white/90">Level 4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Navigation Scrollbar */}
      <div className="lg:hidden flex items-center space-x-1 overflow-x-auto px-4 py-2 bg-black/60 border-t border-white/10 scrollbar-none" id="mobile-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
