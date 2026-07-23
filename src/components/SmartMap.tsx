import React, { useState, useEffect } from 'react';
import { HERITAGE_SITES, NEARBY_BUSINESSES } from '../data/heritageData';
import { HeritageSite, Business } from '../types';
import { MapPin, Search, Compass, Store, Star, Award, Phone, Clock, ArrowRight, ExternalLink, Navigation, Sparkles } from 'lucide-react';

interface SmartMapProps {
  initialSelectedSite: HeritageSite | null;
}

export default function SmartMap({ initialSelectedSite }: SmartMapProps) {
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(HERITAGE_SITES[0]);
  const [businesses, setBusinesses] = useState<Business[]>(NEARBY_BUSINESSES);
  const [filteredCategory, setFilteredCategory] = useState<string>('all');
  const [navTarget, setNavTarget] = useState<Business | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navInstructions, setNavInstructions] = useState<string[]>([]);

  // Track initial selected site from explorer props
  useEffect(() => {
    if (initialSelectedSite) {
      setSelectedSite(initialSelectedSite);
    }
  }, [initialSelectedSite]);

  // Load nearby businesses when a site is selected
  const activeBusinesses = businesses.filter(biz => biz.heritageSiteId === selectedSite?.id && (filteredCategory === 'all' || biz.category === filteredCategory));

  const handleStartNavigation = (biz: Business) => {
    setNavTarget(biz);
    setIsNavigating(true);

    // Simulate custom instructions based on business categories
    const baseInstructions = [
      `Exit the main courtyard entrance of ${selectedSite?.name}.`,
      `Walk ${biz.distance} toward the outer street market lanes.`,
    ];

    if (biz.category === 'restaurant') {
      baseInstructions.push(`Follow the rich aroma of fresh curry spices and traditional filter coffee.`);
      baseInstructions.push(`Turn slightly left near the coconut seller. ${biz.name} is on your right side.`);
    } else if (biz.category === 'handicrafts') {
      baseInstructions.push(`Head past the administrative guide desks.`);
      baseInstructions.push(`You will find the boutique courtyard displaying beautiful paintings. ${biz.name} is on your left.`);
    } else if (biz.category === 'guide') {
      baseInstructions.push(`Walk directly to the official authorized reception office located inside the North Gate.`);
      baseInstructions.push(`Inform the front desk clerk. Guide Govind is waiting near the main information desk.`);
    } else {
      baseInstructions.push(`Proceed down to the designated tourist pick-up and drop zone.`);
      baseInstructions.push(`Your vehicle/service is idling opposite the primary medical aid post.`);
    }

    setNavInstructions(baseInstructions);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full p-2 text-white overflow-hidden font-sans" id="smart-map-root">
      {/* Sleek Space-Saving Header */}
      <div className="flex items-center justify-between px-1 mb-2 shrink-0" id="map-header">
        <div className="min-w-0">
          <h3 className="font-bold text-xs text-white font-serif flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-amber-400 animate-spin" /> Discovery Radar
          </h3>
          <p className="text-[9px] text-white/40 truncate">Cooperative craft, guides & dining spots</p>
        </div>
        {/* Quick dropdown select site */}
        <select
          id="map-site-selector"
          value={selectedSite?.id || ''}
          onChange={(e) => {
            const site = HERITAGE_SITES.find(s => s.id === e.target.value);
            if (site) {
              setSelectedSite(site);
              setIsNavigating(false);
              setNavTarget(null);
            }
          }}
          className="bg-[#0A0A0B]/80 border border-white/10 text-white text-[10px] font-bold py-1 px-2 rounded-xl outline-none focus:border-amber-500 focus:bg-[#0A0A0B] cursor-pointer"
        >
          {HERITAGE_SITES.map(site => (
            <option key={site.id} value={site.id} className="bg-[#121214] text-white">{site.city}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden" id="map-layout-grid">
        {/* Styled Vector Map Canvas - Compact at the top of the phone */}
        <div className="h-[210px] shrink-0 bg-white/5 border border-white/10 rounded-2xl p-1 shadow-md flex flex-col relative overflow-hidden" id="map-canvas-column">
          {/* Interactive Vector Map Board */}
          <div className="flex-1 bg-[#09090b] rounded-xl relative border border-white/5 overflow-hidden" id="map-board">
            
            {/* Grid overlay lines */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-15 pointer-events-none" id="grid-coordinates">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border-r border-b border-white/20" />
              ))}
            </div>

            {/* Simulated Tamil Nadu Coastline background */}
            <div className="absolute right-0 top-0 bottom-0 w-[80px] bg-sky-500/5 border-l border-sky-500/15 flex items-center justify-center pointer-events-none" id="bay-of-bengal">
              <span className="text-[8px] uppercase font-black tracking-widest text-sky-400/20 rotate-90 font-mono">Bay of Bengal</span>
            </div>

            {/* Map Markers for all 12 Heritage Sites */}
            <div className="absolute inset-0" id="monument-markers-layer">
              {HERITAGE_SITES.map((site) => {
                // Map GPS coordinates into visual percentage positions on our canvas
                let top = 45;
                let left = 45;

                if (site.id === 'brihadisvara') { top = 50; left = 55; }
                else if (site.id === 'shore-temple') { top = 18; left = 75; }
                else if (site.id === 'meenakshi') { top = 65; left = 40; }
                else if (site.id === 'vivekananda-rock') { top = 88; left = 35; }
                else if (site.id === 'thirumalai-nayakkar') { top = 68; left = 43; }
                else if (site.id === 'nilgiri-railway') { top = 38; left = 20; }
                else if (site.id === 'gingee-fort') { top = 25; left = 55; }
                else if (site.id === 'chettinad-palace') { top = 58; left = 62; }

                const isSelected = selectedSite?.id === site.id;

                return (
                  <button
                    key={site.id}
                    id={`map-marker-${site.id}`}
                    onClick={() => {
                      setSelectedSite(site);
                      setIsNavigating(false);
                      setNavTarget(null);
                    }}
                    className="absolute z-30 group transition-all"
                    style={{ top: `${top}%`, left: `${left}%` }}
                  >
                    <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                      <div className={`p-0.5 rounded-full shadow-lg border transition-all ${
                        isSelected 
                          ? 'bg-amber-500 text-black scale-110 border-amber-300' 
                          : 'bg-white/10 text-white/60 border-white/10 group-hover:bg-white/25'
                      }`} id={`marker-badge-${site.id}`}>
                      <MapPin className="h-3.5 w-3.5" />
                      </div>
                      
                      {/* Name tooltip */}
                      <span className={`block text-[7.5px] font-bold px-1 py-0.5 rounded shadow-md whitespace-nowrap transition-all ${
                        isSelected 
                          ? 'bg-amber-500 text-black font-extrabold' 
                          : 'bg-[#121214]/90 text-white/80 border border-white/10 group-hover:bg-[#1c1c20]'
                      }`} id={`marker-label-${site.id}`}>
                        {site.city}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Local Business geofenced markers around the selected site */}
            {selectedSite && (
              <div className="absolute inset-0" id="business-markers-layer">
                {/* Visual Radar Pulse surrounding selected monument */}
                {(() => {
                  let top = 50; let left = 55;
                  if (selectedSite.id === 'brihadisvara') { top = 50; left = 55; }
                  else if (selectedSite.id === 'shore-temple') { top = 18; left = 75; }
                  else if (selectedSite.id === 'meenakshi') { top = 65; left = 40; }
                  else if (selectedSite.id === 'vivekananda-rock') { top = 88; left = 35; }
                  else if (selectedSite.id === 'thirumalai-nayakkar') { top = 68; left = 43; }
                  else if (selectedSite.id === 'nilgiri-railway') { top = 38; left = 20; }
                  else if (selectedSite.id === 'gingee-fort') { top = 25; left = 55; }
                  else if (selectedSite.id === 'chettinad-palace') { top = 58; left = 62; }

                  return (
                    <>
                      {/* Geofence Radar Circle */}
                      <div 
                        className="absolute w-28 h-28 rounded-full border border-amber-500/30 bg-amber-500/5 animate-[pulse_3s_ease-in-out_infinite] z-10 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                        style={{ top: `${top}%`, left: `${left}%` }}
                      />

                      {/* Render markers for actual geofenced local businesses */}
                      {activeBusinesses.map((biz, index) => {
                        // Offset biz pins slightly from the main site pin to simulate proximity
                        const angle = (index * (360 / activeBusinesses.length)) * (Math.PI / 180);
                        const radius = 40; // visual radius offset in pixels
                        const offX = Math.cos(angle) * radius;
                        const offY = Math.sin(angle) * radius;

                        const isTarget = navTarget?.id === biz.id;

                        return (
                          <div
                            key={biz.id}
                            className="absolute z-40"
                            style={{ 
                              top: `calc(${top}% + ${offY}px)`, 
                              left: `calc(${left}% + ${offX}px)` 
                            }}
                          >
                            {/* Animated route trail connecting site pin to business pin when Nav is triggered */}
                            {isNavigating && isTarget && (
                              <svg className="absolute overflow-visible pointer-events-none" style={{ left: `${-offX}px`, top: `${-offY}px`, width: '1px', height: '1px' }}>
                                <line 
                                  x1={0} 
                                  y1={0} 
                                  x2={offX} 
                                  y2={offY} 
                                  stroke="#f59e0b" 
                                  strokeWidth="2.5" 
                                  strokeDasharray="5,4"
                                  className="animate-[dash_1s_linear_infinite]"
                                />
                              </svg>
                            )}

                            <button
                              onClick={() => handleStartNavigation(biz)}
                              className={`p-0.5 rounded-full shadow border transition-all ${
                                isTarget 
                                  ? 'bg-[#10b981] text-white scale-110 border-white' 
                                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:scale-110 cursor-pointer'
                              }`}
                              title={biz.name}
                            >
                              <Store className="h-3 w-3" />
                            </button>
                          </div>
                        );
                      })}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Categories Horizontal Pills bar */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 shadow-md shrink-0" id="directory-filters">
          <div className="flex space-x-1.5 overflow-x-auto scrollbar-none pb-0.5" id="radar-categories-row">
            {[
              { id: 'all', label: 'All Shops' },
              { id: 'restaurant', label: '🍛 Cuisines' },
              { id: 'handicrafts', label: '🎨 Crafts' },
              { id: 'taxi', label: '🚗 Taxis' },
              { id: 'guide', label: '🧑 Guides' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilteredCategory(cat.id)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition cursor-pointer ${
                  filteredCategory === cat.id
                    ? 'bg-amber-500 text-black font-extrabold shadow-sm'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Geofenced Business Directory Listings & Navigation directions (scrolling list) */}
        <div className="flex-1 flex flex-col min-h-0" id="directory-column">
          {/* Scrolling Listings and Nav panel */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-2.5 shadow-lg overflow-y-auto space-y-2.5 min-h-0" id="radar-listings-container">
            {/* If Navigating, display directions card first */}
            {isNavigating && navTarget && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 space-y-2 shadow-inner shrink-0" id="navigation-hud">
                <div className="flex justify-between items-center border-b border-white/10 pb-1" id="nav-hud-title">
                  <h4 className="text-[10px] font-bold text-amber-400 flex items-center gap-1 font-serif animate-pulse">
                    <Navigation className="h-3.5 w-3.5 animate-spin text-amber-400" /> Walk Navigation HUD
                  </h4>
                  <button
                    onClick={() => { setIsNavigating(false); setNavTarget(null); }}
                    className="text-[9px] font-bold text-white/40 hover:text-white uppercase cursor-pointer"
                  >
                    Exit Nav
                  </button>
                </div>

                <div className="space-y-1.5" id="nav-steps-list">
                  <span className="block text-[8.5px] uppercase font-bold text-amber-400 tracking-wide font-mono">To: {navTarget.name}</span>
                  {navInstructions.map((inst, i) => (
                    <div key={i} className="flex items-start space-x-1.5 text-[10.5px] text-white/85 leading-snug" id={`nav-step-${i}`}>
                      <span className="text-amber-400 font-bold">{i + 1}.</span>
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Listings */}
            <div className="space-y-2" id="listings-feed">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1 font-serif">
                <Store className="h-3.5 w-3.5 text-amber-400 animate-pulse" /> Shops near {selectedSite?.city}
              </h4>

              {activeBusinesses.length > 0 ? (
                activeBusinesses.map(biz => {
                  const isTarget = navTarget?.id === biz.id;
                  return (
                    <div
                      key={biz.id}
                      id={`biz-item-${biz.id}`}
                      className={`border rounded-xl p-2.5 transition flex flex-col justify-between ${
                        isTarget 
                          ? 'bg-amber-500/5 border-amber-500/30 shadow-md' 
                          : 'bg-[#0A0A0B]/40 border-white/5 hover:bg-[#0A0A0B]/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2" id="biz-header-card">
                        <div className="space-y-1 min-w-0" id="biz-content-meta">
                          <div className="flex items-center gap-1.5">
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[7px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded font-mono">
                              {biz.category}
                            </span>
                            <span className="text-[9px] text-amber-400 font-semibold">{biz.distance} away</span>
                          </div>
                          <h4 className="text-xs font-bold text-white leading-snug font-serif truncate">{biz.name}</h4>
                          <p className="text-[10px] text-white/70 leading-normal line-clamp-2">{biz.description}</p>
                          <div className="flex items-center space-x-2 text-[9px] text-white/40 font-mono" id="biz-metrics">
                            <span>📞 {biz.contact}</span>
                          </div>
                        </div>

                        {/* Average rating star badge */}
                        <div className="text-right shrink-0" id="biz-stars">
                          <span className="inline-flex items-center gap-0.5 bg-white/10 border border-white/10 text-[9px] font-bold text-white py-0.5 px-1.5 rounded font-mono">
                            <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" /> {biz.rating}
                          </span>
                        </div>
                      </div>

                      {/* Navigation buttons trigger */}
                      <div className="border-t border-white/5 pt-2 mt-2 flex justify-between items-center" id="biz-nav-action">
                        <span className="text-[9px] text-white/40 truncate max-w-[140px] font-mono">{biz.address}</span>
                        <button
                          onClick={() => handleStartNavigation(biz)}
                          className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-[8.5px] uppercase tracking-wider py-1 px-2.5 rounded-lg flex items-center space-x-1 border-none cursor-pointer"
                          id={`start-nav-btn-${biz.id}`}
                        >
                          <Navigation className="h-2.5 w-2.5 fill-current" />
                          <span>Navigate</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-[10px] text-white/40 italic py-2 text-center">No shops mapped for this category near {selectedSite?.city}.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
