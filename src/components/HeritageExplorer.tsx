import React, { useState, useEffect } from 'react';
import { HERITAGE_SITES, NEARBY_BUSINESSES } from '../data/heritageData';
import { HeritageSite, Review, Business } from '../types';
import VoiceGuidePlayer from './VoiceGuidePlayer';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightboxModal } from './ImageLightboxModal';
import { 
  Search, Filter, Star, Clock, Ticket, ShieldCheck, MapPin, 
  ArrowLeft, Calendar, ThumbsUp, Send, MessageSquare, AlertTriangle, Info, Camera, Sparkles, ZoomIn
} from 'lucide-react';

// Preloaded mock reviews in LocalStorage if not present
const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'r1',
    siteId: 'brihadisvara',
    userName: 'Rajesh Kumar',
    rating: 5,
    content: 'An absolute masterpiece of human engineering! Standing in front of the 216-foot vimana is a humbling experience. Highly recommend taking a guide to read the Chola inscriptions on the walls.',
    date: '2026-07-15',
    likes: 24,
    reply: 'Thank you Rajesh! The Thanjavur Heritage Board appreciated your visit. We have recently installed new multilingual audio panels around the courtyard.'
  },
  {
    id: 'r2',
    siteId: 'brihadisvara',
    userName: 'Sarah Jenkins',
    rating: 5,
    content: 'Unbelievably gorgeous temple. The fact that they transported granite from miles away without modern technology is mindblowing. Remember to visit at 5 PM when the stone is cooler to walk on barefoot.',
    date: '2026-07-10',
    likes: 18
  },
  {
    id: 'r3',
    siteId: 'meenakshi',
    userName: 'Priya Sundaram',
    rating: 5,
    content: 'The most vibrant, colorful, and spiritually active temple I have ever seen. The Hall of 1000 Pillars is a marvel. Be sure to check your mobile phone in the locker before entering.',
    date: '2026-07-18',
    likes: 42,
    reply: 'Vanakkam Priya! Glad you enjoyed the sacred Hall of Pillars. We hope you witnessed the night ceremony too!'
  },
  {
    id: 'r4',
    siteId: 'shore-temple',
    userName: 'Yuki Sato',
    rating: 4,
    content: 'Stunning sunset over the ocean with the temple outline. Magnificent rock-cut structures. Quite crowded, but absolutely worth the trip from Chennai.',
    date: '2026-07-05',
    likes: 12
  }
];

interface HeritageExplorerProps {
  language: string;
  onExploreSiteOnMap: (site: HeritageSite) => void;
}

export default function HeritageExplorer({ language, onExploreSiteOnMap }: HeritageExplorerProps) {
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Review Form States
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formContent, setFormContent] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Lightbox Modal State for Clear High-Res Image View
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');

  const openClearView = (imagesList: string[], startIndex: number = 0, title: string = '') => {
    setLightboxImages(imagesList);
    setLightboxIndex(startIndex);
    setLightboxTitle(title || selectedSite?.name || 'Heritage Image');
    setLightboxOpen(true);
  };

  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('tn_heritage_reviews');
    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      localStorage.setItem('tn_heritage_reviews', JSON.stringify(DEFAULT_REVIEWS));
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  const handleLikeReview = (id: string) => {
    const updated = reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r);
    setReviews(updated);
    localStorage.setItem('tn_heritage_reviews', JSON.stringify(updated));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSite || !formName || !formContent) return;

    const newReview: Review = {
      id: 'rev_' + Date.now(),
      siteId: selectedSite.id,
      userName: formName,
      rating: formRating,
      content: formContent,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('tn_heritage_reviews', JSON.stringify(updated));

    // Save review request trigger for admin analytics
    const adminAnalytics = JSON.parse(localStorage.getItem('tn_admin_analytics') || '{"reviewCount": 4, "pendingCount": 0}');
    localStorage.setItem('tn_admin_analytics', JSON.stringify({
      ...adminAnalytics,
      reviewCount: (adminAnalytics.reviewCount || 4) + 1,
      pendingCount: (adminAnalytics.pendingCount || 0) + 1
    }));

    setFormName('');
    setFormRating(5);
    setFormContent('');
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 4000);
  };

  // Extract unique districts for dropdown
  const uniqueDistricts = Array.from(new Set(HERITAGE_SITES.map(s => s.district)));

  // Filter heritage sites
  const filteredSites = HERITAGE_SITES.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          site.history.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (site.dynasty && site.dynasty.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          site.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'all' || site.district === selectedDistrict;

    return matchesSearch && matchesCategory && matchesDistrict;
  });

  return (
    <div className="flex-1 overflow-y-auto scrollbar-none h-full p-2" id="heritage-explorer-root">
      {!selectedSite ? (
        // ==========================================
        // GRID VIEW OF ALL HERITAGE SITES
        // ==========================================
        <div id="grid-view-container" className="space-y-3 pb-4">
          {/* Hero Introductory Banner */}
          <div className="bg-gradient-to-br from-amber-950/30 via-amber-900/10 to-black text-white rounded-2xl p-4.5 mb-1 relative overflow-hidden border border-white/10 shadow-lg" id="explorer-hero">
            <div className="absolute inset-0 opacity-10 mix-blend-overlay">
              <ImageWithFallback src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600" alt="Pattern Background" showExpandOverlay={false} className="w-full h-full object-cover opacity-10 mix-blend-overlay" />
            </div>
            <div className="relative z-10" id="hero-content-box">
              <span className="inline-flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="h-3 w-3 text-amber-400 animate-spin" />
                <span>UNESCO Legacies</span>
              </span>
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-white font-serif">
                Explore Eternal <span className="text-amber-400">Tamil Nadu</span>
              </h2>
              <p className="mt-1 text-[10.5px] text-white/75 leading-relaxed">
                Step inside 2,000+ years of Dravidian architectural supremacy and imperial dynasty traditions.
              </p>
            </div>
          </div>

          {/* Search and Filters panel */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-3.5 shadow-md flex flex-col gap-2.5" id="filters-panel">
            {/* Search Input */}
            <div className="relative flex-1" id="search-input-box">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
              <input
                id="site-search-bar"
                type="text"
                placeholder="Search temples, dynasties, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A0A0B]/80 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* District Filter Dropdown */}
            <div className="w-full" id="district-filter-box">
              <select
                id="district-dropdown"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-[#0A0A0B]/80 border border-white/10 rounded-lg py-2 px-2.5 text-xs text-white outline-none focus:border-amber-500 transition cursor-pointer"
              >
                <option value="all" className="bg-[#121214] text-white">📍 All Districts</option>
                {uniqueDistricts.map(dist => (
                  <option key={dist} value={dist} className="bg-[#121214] text-white">{dist}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Categories Filter Tab-row - Horizontally scrollable */}
          <div className="flex space-x-1.5 overflow-x-auto scrollbar-none pb-1" id="category-tabs-row">
            {[
              { id: 'all', label: 'All Monuments' },
              { id: 'temple', label: '🛕 Temples' },
              { id: 'palace', label: '👑 Palaces' },
              { id: 'fort', label: '🛡️ Forts' },
              { id: 'monument', label: '🗿 Sculptures' },
              { id: 'nature', label: '⛰️ Nature' }
            ].map(tab => (
              <button
                key={tab.id}
                id={`cat-filter-${tab.id}`}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all border ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-black border-amber-500 shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Layout of sites */}
          {filteredSites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4" id="heritage-sites-grid">
              {filteredSites.map(site => (
                <div
                  key={site.id}
                  id={`site-card-${site.id}`}
                  onClick={() => setSelectedSite(site)}
                  className="bg-white/5 rounded-2xl border border-white/10 shadow-lg hover:border-amber-500/30 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group hover:-translate-y-1 text-white"
                >
                  {/* Site Image Cover */}
                  <div className="relative h-48 bg-white/5 overflow-hidden" id={`site-img-box-${site.id}`}>
                    <ImageWithFallback
                      src={site.image}
                      alt={site.name}
                      showExpandOverlay={true}
                      onExpand={() => openClearView([site.image, ...site.gallery], 0, site.name)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none" id={`site-badge-box-${site.id}`}>
                      {site.unescoStatus && (
                        <span className="bg-amber-500 text-black text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm font-sans">
                          UNESCO Heritage
                        </span>
                      )}
                      <span className="bg-black/80 text-white/90 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/10 font-sans">
                        {site.category}
                      </span>
                    </div>
                    {site.dynasty && (
                      <div className="absolute bottom-3 left-3 bg-black/80 text-amber-400 border border-white/10 text-[10px] font-extrabold py-1 px-2.5 rounded-lg shadow-sm font-sans z-10 pointer-events-none" id={`dynasty-${site.id}`}>
                        {site.dynasty}
                      </div>
                    )}
                  </div>

                  {/* Site Metadata info */}
                  <div className="p-5 flex-1 flex flex-col justify-between" id={`site-info-box-${site.id}`}>
                    <div>
                      <div className="flex items-center justify-between text-xs text-white/50 mb-1" id="site-loc-rating">
                        <span className="flex items-center gap-1 font-semibold text-amber-400">
                          <MapPin className="h-3 w-3" /> {site.city}, {site.district}
                        </span>
                        <span className="flex items-center gap-0.5 font-bold text-white/80">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {site.rating}
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-white leading-tight group-hover:text-amber-400 transition" id={`site-title-${site.id}`}>
                        {site.name}
                      </h3>
                      {site.tamilName && (
                        <p className="text-xs font-semibold text-white/40 mt-0.5">{site.tamilName}</p>
                      )}
                      <p className="text-xs text-white/60 mt-2 line-clamp-3 leading-relaxed">
                        {site.history}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-3 mt-4 flex justify-between items-center text-xs font-semibold text-amber-400" id="site-cta-box">
                      <span>Explore details →</span>
                      <span className="text-white/40 font-medium">Built: {site.constructionYear || 'Ancient'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10" id="no-sites-match">
              <Info className="h-8 w-8 text-white/30 mx-auto mb-2" />
              <p className="text-white/60 text-sm font-semibold">No heritage monuments found matching those filter tags.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDistrict('all'); }}
                className="mt-3 text-xs bg-amber-500 hover:bg-amber-600 text-black font-extrabold py-1.5 px-4 rounded-xl shadow-md shadow-amber-500/10"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        // ==========================================
        // DETAIL DEEP-DIVE VIEW OF A HERITAGE SITE
        // ==========================================
        <div className="bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden text-white mb-4" id="details-view-container">
          {/* Header Back & Action Row */}
          <div className="relative h-[200px] sm:h-[280px] bg-white/5" id="details-header-banner">
            <ImageWithFallback
              src={selectedSite.image}
              alt={selectedSite.name}
              showExpandOverlay={true}
              onExpand={() => openClearView([selectedSite.image, ...selectedSite.gallery], 0, selectedSite.name)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-black/30 to-black/50 pointer-events-none" />
            
            {/* Float Back button */}
            <button
              onClick={() => setSelectedSite(null)}
              className="absolute top-3 left-3 bg-black/75 hover:bg-black/90 text-white px-2.5 py-1.5 rounded-lg border border-white/10 shadow-md transition-all active:scale-95 flex items-center space-x-1 text-[10px] font-bold cursor-pointer z-10"
              id="back-to-directory"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-amber-400" />
              <span>Back</span>
            </button>

            {/* Float Navigation Trigger button */}
            <button
              onClick={() => onExploreSiteOnMap(selectedSite)}
              className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-600 text-black px-2.5 py-1.5 rounded-lg shadow-lg shadow-amber-500/10 transition-all active:scale-95 flex items-center space-x-1 text-[10px] font-bold cursor-pointer border-none z-10"
              id="locate-on-map-btn"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Nearby Shops</span>
            </button>

            {/* Title / Labels overlap bottom */}
            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none z-10" id="banner-text">
              <div className="flex flex-wrap items-center gap-2 mb-2" id="banner-badges">
                {selectedSite.unescoStatus && (
                  <span className="bg-amber-500 text-black text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    UNESCO Monument
                  </span>
                )}
                <span className="bg-white/10 backdrop-blur-sm text-white/95 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
                  {selectedSite.category}
                </span>
                {selectedSite.dynasty && (
                  <span className="bg-amber-950/80 backdrop-blur-sm text-amber-300 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border border-amber-500/20">
                    {selectedSite.dynasty}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight font-serif" id="detail-title">
                {selectedSite.name}
              </h2>
              {selectedSite.tamilName && (
                <p className="text-sm font-bold text-amber-400 mt-1">{selectedSite.tamilName}</p>
              )}
            </div>
          </div>

          {/* Grid Layout details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-3.5" id="details-grid">
            {/* Main content col (Left, 2 cols) */}
            <div className="lg:col-span-2 space-y-6" id="details-main-column">
              {/* Audio Guide Narrator */}
              <VoiceGuidePlayer 
                textToRead={`${selectedSite.name}. Dynasty: ${selectedSite.dynasty || 'unknown'}. Built in ${selectedSite.constructionYear || 'Ancient time'}. ${selectedSite.history}`} 
                title={selectedSite.name}
                lang={language}
              />

              {/* History text */}
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6" id="history-section">
                <h3 className="text-lg font-bold font-serif text-white mb-3 flex items-center gap-1.5 border-b border-white/10 pb-2">
                  <Info className="h-5 w-5 text-amber-400" /> Architectural & Historical Origins
                </h3>
                <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line" id="history-content">
                  {selectedSite.history}
                </p>
              </div>

              {/* Image Gallery */}
              <div className="space-y-3" id="gallery-section">
                <div className="flex justify-between items-center" id="gallery-header-row">
                  <h3 className="text-lg font-bold font-serif text-white flex items-center gap-1.5">
                    <Camera className="h-5 w-5 text-amber-400" /> Photo Gallery
                  </h3>
                  <button
                    id="clear-view-gallery-btn"
                    onClick={() => openClearView(selectedSite.gallery, 0, selectedSite.name)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 cursor-pointer hover:bg-amber-500/20 transition"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                    <span>Clear View All ({selectedSite.gallery.length})</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3" id="gallery-grid">
                  {selectedSite.gallery.map((img, i) => (
                    <div 
                      key={i} 
                      className="h-28 bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm hover:border-amber-500/50 transition cursor-pointer"
                      onClick={() => openClearView(selectedSite.gallery, i, `${selectedSite.name} - Photo ${i + 1}`)}
                    >
                      <ImageWithFallback 
                        src={img} 
                        alt={`${selectedSite.name} Gallery ${i + 1}`} 
                        showExpandOverlay={true}
                        onExpand={() => openClearView(selectedSite.gallery, i, `${selectedSite.name} - Photo ${i + 1}`)}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Review system */}
              <div className="space-y-6 pt-4 border-t border-white/10" id="reviews-section">
                <div className="flex justify-between items-center" id="reviews-header">
                  <h3 className="text-lg font-bold font-serif text-white flex items-center gap-1.5">
                    <MessageSquare className="h-5 w-5 text-amber-400" /> Community Reviews
                  </h3>
                  <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">
                    ★ {selectedSite.rating} Rating
                  </span>
                </div>

                {/* Submit review Form */}
                <form onSubmit={handleAddReview} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4" id="review-submission-form">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Log Your Visit & Review</h4>
                  
                  {formSuccess && (
                    <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs py-2.5 px-4 rounded-xl font-medium" id="review-success">
                      ✓ Nandri! Your review has been submitted successfully to the heritage community moderator.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="review-form-fields-row">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1">Your Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g. Selvam S."
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2 text-sm outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1">Rating</label>
                      <select
                        value={formRating}
                        onChange={(e) => setFormRating(Number(e.target.value))}
                        className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2 text-sm outline-none focus:border-amber-500"
                      >
                        <option value={5} className="bg-[#121214] text-white">⭐⭐⭐⭐⭐ (Excellent)</option>
                        <option value={4} className="bg-[#121214] text-white">⭐⭐⭐⭐ (Very Good)</option>
                        <option value={3} className="bg-[#121214] text-white">⭐⭐⭐ (Average)</option>
                        <option value={2} className="bg-[#121214] text-white">⭐⭐ (Disappointed)</option>
                        <option value={1} className="bg-[#121214] text-white">⭐ (Poor)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1">Review Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your experience, tips on footwear lockers, guides, or timing alerts..."
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      className="w-full bg-[#0A0A0B]/80 border border-white/10 text-white rounded-xl px-3.5 py-2 text-sm outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs py-2 px-5 rounded-xl shadow-lg shadow-amber-500/10 transition active:scale-95 flex items-center space-x-1.5"
                    id="submit-review-btn"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Review</span>
                  </button>
                </form>

                {/* Review Feed */}
                <div className="space-y-4" id="reviews-feed">
                  {reviews.filter(r => r.siteId === selectedSite.id).length > 0 ? (
                    reviews
                      .filter(r => r.siteId === selectedSite.id)
                      .map(rev => (
                        <div key={rev.id} className="border-b border-white/5 pb-4 last:border-0" id={`review-item-${rev.id}`}>
                          <div className="flex items-center justify-between mb-1" id="review-meta">
                            <span className="font-semibold text-sm text-white">{rev.userName}</span>
                            <span className="text-[10px] text-white/40">{rev.date}</span>
                          </div>
                          
                          {/* Star count */}
                          <div className="flex items-center space-x-0.5 text-amber-400 mb-2" id="review-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-amber-400' : 'text-white/10'}`} />
                            ))}
                          </div>

                          <p className="text-xs text-white/85 leading-relaxed mb-2">
                            {rev.content}
                          </p>

                          <div className="flex items-center space-x-3 text-[11px]" id="review-actions">
                            <button
                              onClick={() => handleLikeReview(rev.id)}
                              className="text-white/40 hover:text-amber-400 font-semibold flex items-center space-x-1 transition"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span>Helpful ({rev.likes})</span>
                            </button>
                          </div>

                          {/* Authorized official reply */}
                          {rev.reply && (
                            <div className="bg-amber-500/5 border-l-2 border-amber-500 rounded-r-xl p-3 mt-2 text-[11px] text-white/90" id={`review-reply-${rev.id}`}>
                              <p className="font-bold text-amber-400 mb-0.5">⭐ Heritage Officer Response</p>
                              <p>{rev.reply}</p>
                            </div>
                          )}
                        </div>
                      ))
                  ) : (
                    <p className="text-xs text-white/40 italic">No reviews logged yet. Be the first to share your experience!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Side Quick stats Column (Right, 1 col) */}
            <div className="space-y-6" id="details-side-column">
              {/* Quick Info block */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4" id="quick-stats-box">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/10 pb-2">Monument Guidelines</h3>
                
                <div className="flex items-start space-x-3 text-xs text-white/80" id="stat-timings">
                  <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Visiting Hours</span>
                    <span className="text-[11px] text-white/70">{selectedSite.timings}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs text-white/80" id="stat-fees">
                  <Ticket className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Entry Ticket Fees</span>
                    <span className="text-[11px] text-white/70">{selectedSite.entryFees}</span>
                  </div>
                </div>

                {selectedSite.dressCode && (
                  <div className="flex items-start space-x-3 text-xs text-white/80" id="stat-dress">
                    <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-white">Dress Protocol</span>
                      <span className="text-[11px] leading-relaxed text-white/60">{selectedSite.dressCode}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3 text-xs text-white/80" id="stat-architecture">
                  <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Architectural Lineage</span>
                    <span className="text-[11px] text-white/70">{selectedSite.architecture || 'Dravidian style'}</span>
                  </div>
                </div>
              </div>

              {/* Visitor Tips */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3" id="visitor-tips-box">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> Survival Visitor Tips
                </h3>
                <ul className="space-y-2.5 text-xs text-white/80" id="tips-list">
                  {selectedSite.visitorTips.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-2 leading-relaxed">
                      <span className="text-amber-400 font-bold mt-0.5">✔</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local Festivals */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3" id="festivals-box">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 border-b border-white/10 pb-2 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Main Heritage Festivals
                </h3>
                <ul className="space-y-2.5 text-xs text-white/80" id="festivals-list">
                  {selectedSite.festivals.map((fest, i) => (
                    <li key={i} className="flex items-start space-x-2 leading-relaxed">
                      <span className="text-indigo-400 font-bold mt-0.5">✦</span>
                      <span>{fest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Clear High-Res View */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        title={lightboxTitle}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
