import React, { useState, useEffect } from 'react';
import { Review, Business } from '../types';
import { NEARBY_BUSINESSES } from '../data/heritageData';
import { Settings, BarChart2, MessageSquare, Check, Trash2, ShieldCheck, Flag, Star, Send, Award, Users, Camera, Map } from 'lucide-react';

export default function AdminPanel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [activeTab, setActiveTab] = useState<'analytics' | 'moderation' | 'businesses'>('analytics');
  
  // Local storage analytic numbers
  const [stats, setStats] = useState({
    chatbotQueries: 142,
    visionScans: 48,
    itinerariesPlanned: 26,
    reviewCount: 4,
    pendingCount: 0
  });

  // Moderation replies states
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Sync telemetry statistics
    const adminStored = localStorage.getItem('tn_admin_analytics');
    if (adminStored) {
      setStats(JSON.parse(adminStored));
    } else {
      const defaultStats = { chatbotQueries: 142, visionScans: 48, itinerariesPlanned: 26, reviewCount: 4, pendingCount: 0 };
      localStorage.setItem('tn_admin_analytics', JSON.stringify(defaultStats));
      setStats(defaultStats);
    }

    // Load reviews
    const storedReviews = localStorage.getItem('tn_heritage_reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }

    // Load businesses
    setBusinesses(NEARBY_BUSINESSES);
  }, []);

  const handleApproveReview = (id: string) => {
    // Mark as approved (clear pending stats count)
    const updated = reviews.map(r => r.id === id ? { ...r, isApproved: true } : r);
    setReviews(updated);
    localStorage.setItem('tn_heritage_reviews', JSON.stringify(updated));

    const newStats = {
      ...stats,
      pendingCount: Math.max(0, stats.pendingCount - 1)
    };
    setStats(newStats);
    localStorage.setItem('tn_admin_analytics', JSON.stringify(newStats));

    setSuccessMsg('Review approved and posted to the live monument feed.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to flag and delete this review?')) {
      const updated = reviews.filter(r => r.id !== id);
      setReviews(updated);
      localStorage.setItem('tn_heritage_reviews', JSON.stringify(updated));

      const newStats = {
        ...stats,
        pendingCount: Math.max(0, stats.pendingCount - 1),
        reviewCount: Math.max(0, stats.reviewCount - 1)
      };
      setStats(newStats);
      localStorage.setItem('tn_admin_analytics', JSON.stringify(newStats));

      setSuccessMsg('Review flagged and removed.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handlePostReply = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    const txt = replyText[id];
    if (!txt) return;

    const updated = reviews.map(r => r.id === id ? { ...r, reply: txt } : r);
    setReviews(updated);
    localStorage.setItem('tn_heritage_reviews', JSON.stringify(updated));

    // Clear reply form state
    setReplyText(prev => ({ ...prev, [id]: '' }));
    setSuccessMsg('Official authority reply posted and synced successfully.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full p-2 text-white overflow-y-auto scrollbar-none space-y-3" id="admin-root">
      {/* Sleek space-saving header */}
      <div className="flex items-center justify-between px-1 shrink-0" id="admin-header">
        <div className="min-w-0">
          <h3 className="font-bold text-xs text-white font-serif flex items-center gap-1.5">
            <Settings className="h-4 w-4 text-amber-400 animate-spin" /> Admin Console
          </h3>
          <p className="text-[9px] text-white/40 truncate">Ratings, reviews, and CMS registry</p>
        </div>
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 font-mono">
          Gov Panel
        </span>
      </div>

      {/* Compact horizontal tab selector */}
      <div className="flex bg-[#0A0A0B]/80 p-1 rounded-xl border border-white/10 text-[9px] font-bold uppercase tracking-wider shrink-0 overflow-x-auto scrollbar-none space-x-1" id="admin-subtabs">
        {[
          { id: 'analytics', label: '📊 Stats' },
          { id: 'moderation', label: `💬 Queue (${stats.pendingCount})` },
          { id: 'businesses', label: '🛡️ Registry' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-500 text-black font-extrabold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {successMsg && (
        <div className="bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] text-[10px] py-2 px-3 rounded-xl font-bold font-mono shrink-0" id="admin-success-hud">
          ✓ {successMsg}
        </div>
      )}

      {/* ==========================================
          ANALYTICS TAB
          ========================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-3 pb-6" id="analytics-tab-panel">
          {/* Numeric stat cards - 2 column grid */}
          <div className="grid grid-cols-2 gap-2" id="admin-stat-counters">
            {[
              { label: 'Chat Queries', value: stats.chatbotQueries, icon: Users, color: 'text-amber-400' },
              { label: 'Vision Scans', value: stats.visionScans, icon: Camera, color: 'text-emerald-400' },
              { label: 'Itineraries', value: stats.itinerariesPlanned, icon: Map, color: 'text-[#4f46e5]' },
              { label: 'Guest Reviews', value: stats.reviewCount, icon: MessageSquare, color: 'text-rose-400' }
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/5 p-2.5 rounded-xl shadow-sm space-y-1" id={`stat-card-${i}`}>
                  <div className="flex justify-between items-center" id="stat-card-header">
                    <span className="text-[8px] uppercase font-bold tracking-wider text-white/40 font-mono">{card.label}</span>
                    <Icon className={`h-3.5 w-3.5 ${card.color} animate-pulse`} />
                  </div>
                  <h3 className="text-sm font-bold text-white font-serif">{card.value}</h3>
                  <span className="text-[7.5px] text-emerald-400 font-bold block font-mono">↑ +14% week</span>
                </div>
              );
            })}
          </div>

          {/* SVG quota usage graph and scanned temples chart */}
          <div className="space-y-3" id="analytics-charts-grid">
            {/* AI quota chart */}
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl shadow-md space-y-3" id="quota-usage-card">
              <h3 className="font-bold text-[9px] text-white/50 uppercase tracking-wider font-serif">Gemini Quota Utilization</h3>
              
              <div className="h-32 flex items-end justify-between px-2 pb-1 border-b border-white/10" id="quota-chart-container">
                {[
                  { month: 'Jan', val: 35 }, { month: 'Feb', val: 55 }, { month: 'Mar', val: 42 }, 
                  { month: 'Apr', val: 78 }, { month: 'May', val: 92 }, { month: 'Jun', val: 68 }, { month: 'Jul', val: 96 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 space-y-1" id={`quota-bar-${idx}`}>
                    <span className="text-[8px] font-bold text-white/80 font-mono">{item.val}%</span>
                    <div 
                      className="w-4 rounded-t bg-amber-500 transition-all duration-300 hover:bg-amber-400 shadow-sm"
                      style={{ height: `${item.val * 0.8}px` }}
                    />
                    <span className="text-[8px] font-bold text-white/40 font-mono">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scanned temples distribution */}
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl shadow-md space-y-3" id="monument-distribution-card">
              <h3 className="font-bold text-[9px] text-white/50 uppercase tracking-wider font-serif">Top Scanned Monuments</h3>
              <div className="space-y-2 pt-1" id="distribution-items">
                {[
                  { name: 'Brihadisvara Temple', percent: 45, color: 'bg-amber-500' },
                  { name: 'Shore Temple', percent: 25, color: 'bg-emerald-500' },
                  { name: 'Meenakshi Temple', percent: 18, color: 'bg-[#4f46e5]' },
                  { name: 'Vivekananda Rock', percent: 12, color: 'bg-rose-500' }
                ].map((mon, i) => (
                  <div key={i} className="space-y-0.5" id={`dist-item-${i}`}>
                    <div className="flex justify-between text-[10px] font-mono" id="dist-meta">
                      <span className="font-bold text-white/95 truncate max-w-[170px]">{mon.name}</span>
                      <span className="font-bold text-white/50">{mon.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden" id="dist-bar">
                      <div className={`h-full ${mon.color} rounded-full`} style={{ width: `${mon.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODERATION QUEUE TAB
          ========================================== */}
      {activeTab === 'moderation' && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 shadow-lg space-y-3 pb-6" id="moderation-tab-panel">
          <h3 className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5 font-serif">
            <MessageSquare className="h-3.5 w-3.5 text-amber-400 animate-pulse" /> Reviews Moderation Feed
          </h3>

          <div className="divide-y divide-white/5" id="moderation-queue-list">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev.id} className="py-3 first:pt-0 last:pb-0 space-y-2" id={`mod-item-${rev.id}`}>
                  <div className="flex justify-between items-start gap-1" id="mod-item-header">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1" id="mod-meta">
                        <span className="font-bold text-xs text-white truncate max-w-[90px]">{rev.userName}</span>
                        <span className="bg-white/10 text-white/70 border border-white/5 text-[7px] font-bold px-1.5 py-0.5 rounded font-mono truncate">Site: {rev.siteId}</span>
                      </div>
                      <div className="flex items-center space-x-0.5 text-amber-400 mt-0.5" id="mod-stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-2.5 w-2.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`} />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0 animate-fadeIn" id="mod-actions">
                      <button
                        onClick={() => handleApproveReview(rev.id)}
                        className="bg-emerald-500/15 border border-emerald-500/20 hover:bg-emerald-500/25 text-emerald-400 text-[8.5px] font-bold px-2 py-1 rounded-lg flex items-center space-x-0.5 cursor-pointer transition border-none"
                      >
                        <Check className="h-3 w-3" />
                        <span>Approve</span>
                      </button>
                      
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="bg-red-500/15 border border-red-500/20 hover:bg-red-500/25 text-red-400 text-[8.5px] font-bold px-2 py-1 rounded-lg flex items-center space-x-0.5 cursor-pointer transition border-none"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Flag</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/80 leading-normal bg-black/45 border border-white/5 p-2 rounded-xl italic">
                    "{rev.content}"
                  </p>

                  {/* Official reply input form */}
                  {!rev.reply ? (
                    <form onSubmit={(e) => handlePostReply(rev.id, e)} className="flex items-center space-x-1" id={`reply-form-${rev.id}`}>
                      <input
                        type="text"
                        placeholder="Reply to traveler..."
                        value={replyText[rev.id] || ''}
                        onChange={(e) => setReplyText(prev => ({ ...prev, [rev.id]: e.target.value }))}
                        className="flex-1 bg-[#0A0A0B]/80 border border-white/10 text-white rounded-lg px-2 py-1 text-[9px] outline-none focus:border-amber-500 font-sans"
                      />
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-[9px] py-1 px-2 rounded-lg flex items-center space-x-0.5 border-none cursor-pointer transition"
                      >
                        <Send className="h-2.5 w-2.5 fill-current" />
                        <span>Post</span>
                      </button>
                    </form>
                  ) : (
                    <div className="bg-amber-500/5 border border-amber-500/15 rounded-lg p-2 text-[9px] text-white/90" id={`posted-reply-${rev.id}`}>
                      <p className="font-bold text-amber-400 mb-0.5 font-serif">✓ Authority Reply:</p>
                      <p className="leading-snug">{rev.reply}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-[10px] text-white/40 italic text-center py-4">No reviews pending moderation.</p>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          BUSINESS REGISTRY TAB
          ========================================== */}
      {activeTab === 'businesses' && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 shadow-lg space-y-3 pb-6" id="businesses-tab-panel">
          <h3 className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5 font-serif">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400 animate-pulse" /> Craft & Dining Registry
          </h3>

          <div className="space-y-2.5" id="biz-registry-list">
            {businesses.map((biz) => (
              <div 
                key={biz.id} 
                className="bg-[#0A0A0B]/40 border border-white/5 rounded-xl p-2.5 transition flex flex-col justify-between" 
                id={`biz-row-${biz.id}`}
              >
                <div className="flex justify-between items-start gap-1" id="biz-cell-name">
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-white block font-serif truncate">{biz.name}</span>
                    <span className="text-[9px] text-white/40 block truncate">{biz.address}</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider font-mono shrink-0">
                    VERIFIED
                  </span>
                </div>

                <div className="border-t border-white/5 pt-1.5 mt-1.5 flex justify-between items-center text-[9px]" id="biz-cell-footer">
                  <span className="bg-white/5 text-white/70 px-1.5 py-0.5 rounded font-medium font-mono">{biz.category}</span>
                  <span className="font-mono text-white/40">{biz.contact}</span>
                  <span className="font-bold text-amber-400 font-mono">★ {biz.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
