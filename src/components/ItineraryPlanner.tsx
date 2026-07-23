import React, { useState } from 'react';
import { Itinerary, ItineraryActivity } from '../types';
import { 
  Calendar, RefreshCw, DollarSign, Users, Award, ShieldAlert, Check, 
  ChevronDown, ChevronUp, Copy, BookOpen, Sparkles, MapPin, ExternalLink, 
  Download, Volume2, Compass, Utensils, ShoppingBag, Landmark, Coffee, 
  CheckCircle2, Circle, Plus, Search, Filter, Lightbulb, Clock
} from 'lucide-react';
import VoiceGuidePlayer from './VoiceGuidePlayer';

export default function ItineraryPlanner() {
  const [duration, setDuration] = useState(3);
  const [budget, setBudget] = useState('Moderate');
  const [theme, setTheme] = useState('Cultural Heritage & Temples');
  const [companions, setCompanions] = useState('Solo');
  const [destination, setDestination] = useState('Thanjavur & Madurai');
  const [pace, setPace] = useState('Balanced');
  const [dietary, setDietary] = useState('Pure Vegetarian (Brahmin / Jain friendly)');
  
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });
  
  // Interactive activity tracking
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom user additions per day
  const [customNotes, setCustomNotes] = useState<Record<number, string[]>>({});
  const [noteInputs, setNoteInputs] = useState<Record<number, string>>({});

  const toggleDay = (day: number) => {
    setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleActivityComplete = (actKey: string) => {
    setCompletedActivities(prev => ({ ...prev, [actKey]: !prev[actKey] }));
  };

  const handleCopyItinerary = () => {
    if (!itinerary) return;
    const text = JSON.stringify(itinerary, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadItinerary = () => {
    if (!itinerary) return;
    let content = `========================================================\n`;
    content += `  TAMIL NADU SMART TOURISM AI PLANNER - ITINERARY\n`;
    content += `========================================================\n\n`;
    content += `TRIP: ${itinerary.title}\n`;
    content += `Duration: ${itinerary.duration} Days | Budget: ${itinerary.budget} | Pace: ${itinerary.pace || pace}\n`;
    content += `Dietary Preference: ${itinerary.dietary || dietary}\n\n`;

    if (itinerary.estimatedCost) {
      content += `ESTIMATED BUDGET BREAKDOWN:\n`;
      content += ` - Accommodation: ${itinerary.estimatedCost.accommodation}\n`;
      content += ` - Food & Beverages: ${itinerary.estimatedCost.food}\n`;
      content += ` - Activity Fees: ${itinerary.estimatedCost.activities}\n`;
      content += ` - Transport: ${itinerary.estimatedCost.transport}\n`;
      content += ` - ESTIMATED TOTAL: ${itinerary.estimatedCost.total}\n\n`;
    }

    itinerary.days.forEach((day) => {
      content += `--------------------------------------------------------\n`;
      content += `DAY ${day.day}: ${day.title}\n`;
      content += `Overview: ${day.description}\n`;
      content += `--------------------------------------------------------\n`;
      day.activities.forEach((act, i) => {
        const key = `${day.day}-${i}`;
        const done = completedActivities[key] ? '[✓ COMPLETED]' : '[ ]';
        content += `${done} ${act.time} - ${act.title}\n`;
        content += `   Location: ${act.locationName} | Fee: ${act.fees}\n`;
        content += `   Details: ${act.description}\n`;
        if (act.insiderTip) content += `   💡 Insider Tip: ${act.insiderTip}\n`;
        content += `\n`;
      });

      if (customNotes[day.day]?.length) {
        content += `   CUSTOM USER NOTES:\n`;
        customNotes[day.day].forEach(note => {
          content += `   • ${note}\n`;
        });
        content += `\n`;
      }
    });

    content += `\nCULTURAL GUIDELINES & ADVISORIES:\n`;
    itinerary.tips.forEach(tip => {
      content += `• ${tip}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${itinerary.title.replace(/[^a-zA-Z0-9]/g, '_')}_Blueprint.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddCustomNote = (dayNum: number, e: React.FormEvent) => {
    e.preventDefault();
    const text = noteInputs[dayNum]?.trim();
    if (!text) return;

    setCustomNotes(prev => ({
      ...prev,
      [dayNum]: [...(prev[dayNum] || []), text]
    }));

    setNoteInputs(prev => ({ ...prev, [dayNum]: '' }));
  };

  const generateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setItinerary(null);
    setCompletedActivities({});
    setCustomNotes({});

    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duration,
          budget,
          theme,
          companions,
          destination,
          pace,
          dietary
        })
      });

      if (!response.ok) {
        throw new Error('Itinerary generation failed');
      }

      const data = await response.json();
      setItinerary(data);
      
      // Auto expand first day
      setExpandedDays({ 1: true });

      // Increment admin planning counts
      const adminAnalytics = JSON.parse(localStorage.getItem('tn_admin_analytics') || '{"itinerariesPlanned": 18}');
      localStorage.setItem('tn_admin_analytics', JSON.stringify({
        ...adminAnalytics,
        itinerariesPlanned: (adminAnalytics.itinerariesPlanned || 18) + 1
      }));

    } catch (error) {
      console.error('Itinerary error:', error);
      alert('Had trouble formulating the itinerary. Try again or check your server configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  // Activity category icon helper
  const getCategoryBadge = (cat?: string) => {
    switch (cat?.toLowerCase()) {
      case 'temple':
        return <span className="bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 font-mono">🛕 Temple</span>;
      case 'dining':
        return <span className="bg-orange-500/15 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 font-mono">🍌 Dining</span>;
      case 'shopping':
        return <span className="bg-pink-500/15 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 font-mono">🏺 Crafts</span>;
      case 'sightseeing':
        return <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 font-mono">🏰 Fort/Sight</span>;
      case 'relax':
        return <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 font-mono">🌴 Nature</span>;
      default:
        return <span className="bg-white/10 text-white/80 border border-white/10 px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 font-mono">📍 Landmark</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white font-sans" id="planner-root">
      {/* Upper intro */}
      <div className="text-center max-w-xl mx-auto mb-8" id="planner-intro">
        <span className="inline-flex items-center space-x-1 bg-amber-500/10 text-amber-400 text-xs font-bold py-1 px-3.5 rounded-full border border-amber-500/20">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" />
          <span>Advanced Gemini AI Travel Architect</span>
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-white mt-2 font-serif">Smart AI Itinerary & Route Planner</h2>
        <p className="text-xs text-white/60 mt-1 leading-relaxed">
          Formulate highly tailored, pace-aware travel blueprints with budget estimates, dietary matching, interactive activity checklists, and voice audio guides across Tamil Nadu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="planner-main-grid">
        {/* Left Column Form inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 shadow-lg h-fit text-white" id="planner-form-column">
          <form onSubmit={generateItinerary} className="space-y-4" id="itinerary-input-form">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 font-serif flex items-center gap-2">
              <Compass className="h-4 w-4 text-amber-400" /> Advanced Trip Preferences
            </h3>
            
            {/* Destination base */}
            <div>
              <label className="block text-xs font-bold text-white/60 mb-1.5">Starting City / Base Region</label>
              <select
                id="pref-destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-[#0A0A0B] font-medium cursor-pointer"
              >
                <option value="Thanjavur & Madurai" className="bg-[#121214] text-white">Thanjavur & Madurai (Imperial Chola Heartlands)</option>
                <option value="Chennai & Mahabalipuram" className="bg-[#121214] text-white">Chennai & Mahabalipuram (Pallava Coastal Rock Cuts)</option>
                <option value="Kanyakumari & Rameshwaram" className="bg-[#121214] text-white">Kanyakumari & Rameshwaram (Ocean Confluences & Sacred Bridges)</option>
                <option value="Ooty, Coonoor & Nilgiris" className="bg-[#121214] text-white">Ooty, Coonoor & Nilgiris (Hill Railways & Tea Estates)</option>
                <option value="Chettinad & Karaikudi" className="bg-[#121214] text-white">Chettinad & Karaikudi (Mansion Barons & Spiced Feasts)</option>
              </select>
            </div>

            {/* Grid for budget and duration */}
            <div className="grid grid-cols-2 gap-4" id="form-grid-row">
              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5">Trip Duration</label>
                <select
                  id="pref-duration"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-[#0A0A0B] font-medium cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 10, 14].map(d => (
                    <option key={d} value={d} className="bg-[#121214] text-white">{d} {d === 1 ? 'Day' : 'Days'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5">Budget Level</label>
                <select
                  id="pref-budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-[#0A0A0B] font-medium cursor-pointer"
                >
                  <option value="Budget" className="bg-[#121214] text-white">🎒 Budget (Homestays / Bus)</option>
                  <option value="Moderate" className="bg-[#121214] text-white">🚗 Moderate (3-Star / Taxi)</option>
                  <option value="Luxury" className="bg-[#121214] text-white">👑 Luxury (Resorts / Private Guide)</option>
                </select>
              </div>
            </div>

            {/* Grid for Travel Pace & Dietary Preferences */}
            <div className="grid grid-cols-2 gap-4" id="form-grid-row-2">
              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5">Travel Pace</label>
                <select
                  id="pref-pace"
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-[#0A0A0B] font-medium cursor-pointer"
                >
                  <option value="Relaxed" className="bg-[#121214] text-white">☕ Relaxed (Slow & Leisurely)</option>
                  <option value="Balanced" className="bg-[#121214] text-white">⚖️ Balanced (Optimal Sights)</option>
                  <option value="Fast-Paced" className="bg-[#121214] text-white">⚡ Express (Maximum Coverage)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5">Dietary Focus</label>
                <select
                  id="pref-dietary"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-[#0A0A0B] font-medium cursor-pointer"
                >
                  <option value="Pure Vegetarian (Brahmin / Jain friendly)" className="bg-[#121214] text-white">🥬 Pure Vegetarian (Jain/Brahmin)</option>
                  <option value="Authentic Non-Veg (Chettinad & Madurai Roast)" className="bg-[#121214] text-white">🍗 Non-Veg Chettinad & Madurai</option>
                  <option value="Seafood & Coastal Catch" className="bg-[#121214] text-white">🐟 Seafood & Coastal Catch</option>
                  <option value="Halal Certified Friendly" className="bg-[#121214] text-white">🕌 Halal Certified Friendly</option>
                </select>
              </div>
            </div>

            {/* Travel Theme */}
            <div>
              <label className="block text-xs font-bold text-white/60 mb-1.5">Primary Travel Theme</label>
              <select
                id="pref-theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-[#0A0A0B] font-medium cursor-pointer"
              >
                <option value="Cultural Heritage & Ancient Temples" className="bg-[#121214] text-white">🛕 Cultural Heritage & Ancient Temples</option>
                <option value="Wildlife, Hill Stations & Nature" className="bg-[#121214] text-white">⛰️ Wildlife, Hill Stations & Nature</option>
                <option value="Handicrafts, Textiles & Local Sourcing" className="bg-[#121214] text-white">🏺 Crafts, Silks, and Bronze Casting Workshops</option>
                <option value="Coastal Forts, Lighthouses & Beaches" className="bg-[#121214] text-white">🏖️ Coastal Forts, Beaches & Oceans</option>
                <option value="Culinary Food Walks & Local Spices" className="bg-[#121214] text-white">🌶️ Culinary Feast walks & Chettinad Spices</option>
              </select>
            </div>

            {/* Companions */}
            <div>
              <label className="block text-xs font-bold text-white/60 mb-1.5">Companions</label>
              <select
                id="pref-companions"
                value={companions}
                onChange={(e) => setCompanions(e.target.value)}
                className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-[#0A0A0B] font-medium cursor-pointer"
              >
                <option value="Solo" className="bg-[#121214] text-white">🧑 Solo Traveler</option>
                <option value="Couple" className="bg-[#121214] text-white">👩‍❤️‍👨 Couple / Honeymoon</option>
                <option value="Family" className="bg-[#121214] text-white">👨‍👩‍👧 Family with Kids / Seniors</option>
                <option value="Friends" className="bg-[#121214] text-white">👥 Group of Friends</option>
              </select>
            </div>

            {/* Form submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-white/5 disabled:text-white/20 text-black font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-amber-500/10 transition active:scale-95 flex items-center justify-center space-x-2 border-none cursor-pointer"
              id="generate-itinerary-btn"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Formulating Advanced Blueprint...</span>
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4" />
                  <span>Formulate Advanced Plan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Visual timeline itinerary results (7 cols) */}
        <div className="lg:col-span-7" id="itinerary-results-column">
          {itinerary ? (
            /* Generated Itinerary Card */
            <div className="space-y-6" id="itinerary-display">
              {/* Header card info */}
              <div className="bg-black/60 border border-white/10 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden space-y-4" id="itinerary-summary-card">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute right-0 top-0 bg-amber-500 w-36 h-36 rounded-full filter blur-xl" />
                </div>
                
                <div className="relative z-10 flex justify-between items-start" id="itinerary-summary-content">
                  <div>
                    <span className="bg-amber-500/15 border border-amber-500/20 text-amber-400 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 inline-block font-sans">
                      ★ Active Advanced Travel Blueprint
                    </span>
                    <h2 className="text-lg font-bold font-serif leading-snug text-white">{itinerary.title}</h2>
                    <div className="flex flex-wrap gap-2 text-[10px] text-white/70 mt-2 font-semibold uppercase tracking-wider font-mono" id="itinerary-badges">
                      <span className="bg-white/10 px-2 py-0.5 rounded-md">📆 {itinerary.duration} Days</span>
                      <span className="bg-white/10 px-2 py-0.5 rounded-md">💰 {itinerary.budget}</span>
                      <span className="bg-white/10 px-2 py-0.5 rounded-md">⚡ {itinerary.pace || pace}</span>
                      <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md border border-amber-500/20">🥑 {itinerary.dietary || dietary}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2" id="itinerary-actions">
                    <button
                      onClick={handleDownloadItinerary}
                      className="p-2.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 rounded-xl transition active:scale-95 border border-amber-500/30 cursor-pointer flex items-center space-x-1 text-xs font-bold"
                      title="Download Itinerary Text Document"
                      id="download-itinerary-txt"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export</span>
                    </button>

                    <button
                      onClick={handleCopyItinerary}
                      className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition active:scale-95 border border-white/10 cursor-pointer"
                      title="Copy Raw Itinerary JSON"
                      id="copy-itinerary-json"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-400 animate-pulse" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Estimated Budget Card Breakdown */}
                {itinerary.estimatedCost && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs space-y-2 relative z-10" id="estimated-cost-card">
                    <h4 className="font-bold text-[10px] text-amber-400 uppercase tracking-widest font-mono flex items-center justify-between">
                      <span>💰 Estimated Trip Cost Breakdown</span>
                      <span className="text-white font-black text-xs">{itinerary.estimatedCost.total} / person</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-white/70 pt-1 font-mono">
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="block text-white/40">Accommodation</span>
                        <span className="font-bold text-white">{itinerary.estimatedCost.accommodation}</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="block text-white/40">Food & Dining</span>
                        <span className="font-bold text-white">{itinerary.estimatedCost.food}</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="block text-white/40">Entry Tickets</span>
                        <span className="font-bold text-white">{itinerary.estimatedCost.activities}</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="block text-white/40">Local Transport</span>
                        <span className="font-bold text-white">{itinerary.estimatedCost.transport}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Integrated Audio Player for full blueprint */}
                <div className="pt-1 relative z-10" id="itinerary-audio-player">
                  <VoiceGuidePlayer
                    textToRead={`${itinerary.title}. A ${itinerary.duration} day travel blueprint across ${destination}. Overall theme: ${itinerary.theme}. Estimated budget: ${itinerary.estimatedCost?.total || itinerary.budget}.`}
                    title={`Audio Overview: ${itinerary.title}`}
                    lang="en"
                  />
                </div>
              </div>

              {/* Activity Filters and Search Row */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl" id="itinerary-filter-bar">
                {/* Category filter buttons */}
                <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto scrollbar-none" id="category-pills">
                  {[
                    { id: 'all', label: 'All Sights' },
                    { id: 'temple', label: '🛕 Temples' },
                    { id: 'dining', label: '🍌 Food' },
                    { id: 'shopping', label: '🏺 Crafts' },
                    { id: 'sightseeing', label: '🏰 Forts' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition whitespace-nowrap cursor-pointer border ${
                        categoryFilter === cat.id
                          ? 'bg-amber-500 text-black border-amber-500 shadow-sm'
                          : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Search input */}
                <div className="relative w-full sm:w-44" id="activity-search-box">
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search stops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl pl-8 pr-3 py-1.5 text-[11px] outline-none focus:border-amber-500 font-sans"
                  />
                </div>
              </div>

              {/* Day-by-Day timeline list */}
              <div className="space-y-4" id="timeline-days-list">
                {itinerary.days.map((day) => {
                  const isExpanded = !!expandedDays[day.day];

                  // Filter activities according to selection and search query
                  const filteredActivities = day.activities.filter(act => {
                    const matchesCat = categoryFilter === 'all' || act.category?.toLowerCase() === categoryFilter;
                    const matchesSearch = !searchQuery.trim() || 
                      act.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      act.locationName.toLowerCase().includes(searchQuery.toLowerCase());
                    return matchesCat && matchesSearch;
                  });

                  return (
                    <div
                      key={day.day}
                      id={`day-card-${day.day}`}
                      className="bg-white/5 border border-white/10 rounded-2xl shadow-md overflow-hidden"
                    >
                      {/* Day Header */}
                      <div
                        onClick={() => toggleDay(day.day)}
                        className="p-4 flex justify-between items-center bg-black/20 hover:bg-white/5 cursor-pointer transition select-none"
                        id={`day-header-${day.day}`}
                      >
                        <div className="flex items-center space-x-3" id={`day-title-box-${day.day}`}>
                          <div className="bg-amber-500 text-black text-xs font-black h-8 w-8 rounded-xl flex items-center justify-center shadow-md shrink-0">
                            D{day.day}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white leading-tight font-serif">{day.title}</h4>
                            <p className="text-[10px] text-white/40 truncate max-w-[240px] sm:max-w-md">{day.description}</p>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp className="h-4.5 w-4.5 text-white/40 shrink-0" /> : <ChevronDown className="h-4.5 w-4.5 text-white/40 shrink-0" />}
                      </div>

                      {/* Day Activities Timeline */}
                      {isExpanded && (
                        <div className="p-4 sm:p-5 border-t border-white/10 space-y-4 relative" id={`day-activities-${day.day}`}>
                          {/* Vertical timeline connector line */}
                          <div className="absolute left-[33px] top-6 bottom-6 w-0.5 bg-white/10 hidden sm:block" />

                          {filteredActivities.length > 0 ? (
                            filteredActivities.map((act, idx) => {
                              const actKey = `${day.day}-${idx}`;
                              const isCompleted = !!completedActivities[actKey];

                              return (
                                <div key={idx} className={`flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 relative transition ${isCompleted ? 'opacity-50' : 'opacity-100'}`} id={`activity-${day.day}-${idx}`}>
                                  {/* Left Time Block */}
                                  <div className="flex items-center space-x-2 sm:space-x-0 sm:block sm:w-16 text-left shrink-0" id="activity-time-box">
                                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-lg whitespace-nowrap font-mono flex items-center gap-1">
                                      <Clock className="h-3 w-3" /> {act.time}
                                    </span>
                                  </div>

                                  {/* Decorative bullet node on timeline */}
                                  <div className={`absolute left-[17px] top-[4px] h-3 w-3 rounded-full border-2 hidden sm:block z-10 ${isCompleted ? 'border-green-400 bg-green-400' : 'border-amber-400 bg-[#0A0A0B]'}`} />

                                  {/* Activity details */}
                                  <div className="flex-1 bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs space-y-2 w-full" id="activity-details-card">
                                    <div className="flex flex-wrap items-center justify-between gap-1.5" id="activity-metadata">
                                      <div className="flex items-center space-x-2">
                                        {/* Complete Checkbox */}
                                        <button
                                          onClick={() => toggleActivityComplete(actKey)}
                                          className="text-white/40 hover:text-green-400 transition cursor-pointer border-none bg-transparent"
                                          title={isCompleted ? 'Mark as pending' : 'Mark as visited'}
                                        >
                                          {isCompleted ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <Circle className="h-4 w-4" />}
                                        </button>
                                        <h5 className={`font-bold text-white font-serif ${isCompleted ? 'line-through text-white/50' : ''}`}>{act.title}</h5>
                                      </div>

                                      <div className="flex items-center space-x-2">
                                        {getCategoryBadge(act.category)}
                                        <span className="bg-white/10 text-white/80 border border-white/10 text-[9px] font-bold py-0.5 px-2 rounded-md font-mono">
                                          🎫 {act.fees}
                                        </span>
                                      </div>
                                    </div>

                                    <p className="text-[11px] text-white/85 leading-relaxed">{act.description}</p>

                                    {/* Insider tip if present */}
                                    {act.insiderTip && (
                                      <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg text-[10.5px] text-amber-300/90 flex items-start space-x-1.5">
                                        <Lightbulb className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                        <span><strong>Insider Tip:</strong> {act.insiderTip}</span>
                                      </div>
                                    )}

                                    <div className="flex justify-between items-center pt-1 border-t border-white/5" id="activity-location-footer">
                                      <div className="text-[10px] text-amber-400 font-semibold flex items-center space-x-1 truncate max-w-[200px] sm:max-w-xs">
                                        <span>📍 {act.locationName}</span>
                                      </div>

                                      {/* Open Directions link in Google Maps */}
                                      <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${act.locationName} Tamil Nadu`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[9.5px] font-bold text-white/60 hover:text-amber-400 flex items-center space-x-1 transition font-mono"
                                      >
                                        <span>Maps</span>
                                        <ExternalLink className="h-2.5 w-2.5" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-xs text-white/40 italic text-center py-3">No activities match your filter or search query.</p>
                          )}

                          {/* Custom User Note Insertion Form */}
                          <div className="pt-2 border-t border-white/5" id={`add-note-section-${day.day}`}>
                            {customNotes[day.day]?.map((note, noteIdx) => (
                              <div key={noteIdx} className="bg-white/5 border border-white/10 p-2 rounded-lg text-xs text-amber-300 font-mono mb-2 flex items-center space-x-2">
                                <span className="text-amber-400 font-bold">✦</span>
                                <span className="flex-1">{note}</span>
                              </div>
                            ))}

                            <form onSubmit={(e) => handleAddCustomNote(day.day, e)} className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder={`Add custom stop or personal note to Day ${day.day}...`}
                                value={noteInputs[day.day] || ''}
                                onChange={(e) => setNoteInputs(prev => ({ ...prev, [day.day]: e.target.value }))}
                                className="flex-1 bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3 py-1.5 text-xs outline-none focus:border-amber-500 font-sans"
                              />
                              <button
                                type="submit"
                                className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-1.5 px-3 rounded-xl flex items-center space-x-1 cursor-pointer transition border-none"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                <span>Add</span>
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tips Section */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-5 space-y-3" id="itinerary-tips-card">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 border-b border-white/10 pb-1.5 font-serif">
                  <BookOpen className="h-4 w-4" /> Crucial Cultural & Travel Guidelines
                </h3>
                <ul className="space-y-2 text-xs text-white/80" id="itinerary-tips-list">
                  {itinerary.tips.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-2 leading-relaxed">
                      <span className="text-amber-400 font-bold mt-0.5">✔</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* Planner empty state */
            <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[380px]" id="planner-empty-state">
              <Compass className="h-10 w-10 text-white/20 mb-3 animate-pulse" />
              <h3 className="font-bold text-sm text-white">Awaiting Planner Parameters</h3>
              <p className="text-xs text-white/40 mt-1 max-w-[260px] leading-relaxed">
                Configure duration, pace, budget, dietary requirements, and click "Formulate Advanced Plan" on the left to spawn your custom timeline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
