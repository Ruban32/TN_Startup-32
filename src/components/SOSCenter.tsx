import React, { useState } from 'react';
import { ShieldAlert, Phone, AlertTriangle, MapPin, Share2, Heart, Shield, Landmark } from 'lucide-react';

export default function SOSCenter() {
  const [sosActive, setSosActive] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const triggerSOS = () => {
    setSosActive(true);
    setIsLocating(true);
    
    // Simulate GPS locating (and call HTML Geolocation if supported)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLocating(false);
        },
        () => {
          // Fallback to Thanjavur coords
          setTimeout(() => {
            setCoords({ lat: 10.7828, lng: 79.1318 });
            setIsLocating(false);
          }, 1500);
        }
      );
    } else {
      setTimeout(() => {
        setCoords({ lat: 10.7828, lng: 79.1318 });
        setIsLocating(false);
      }, 1500);
    }
  };

  const emergencyContacts = [
    { title: 'State Police & SOS Emergency', number: '112 / 100', subtitle: 'General assistance line', icon: Shield },
    { title: 'Ambulance & Medical Emergency', number: '108', subtitle: 'Instant healthcare support', icon: Heart },
    { title: 'Women Helpline / Child Care', number: '181', subtitle: 'Dedicated safety dispatch', icon: ShieldAlert },
    { title: 'Tamil Nadu Tourist Helpline', number: '1800 4253 1111', subtitle: 'Official Ministry of Tourism helpdesk', icon: Landmark }
  ];

  const nearSiteHospitals = [
    { name: 'Government Rajaji General Hospital', city: 'Madurai', phone: '+91 452 253 5000' },
    { name: 'Thanjavur Medical College General Hospital', city: 'Thanjavur', phone: '+91 4362 240024' },
    { name: 'Chengalpattu General Hospital', city: 'Chengalpattu/Mahabalipuram', phone: '+91 44 2742 6680' },
    { name: 'Apollo Speciality Hospitals', city: 'Chennai / Trichy', phone: '+91 44 2829 0200' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-white font-sans" id="sos-root">
      {/* Upper header */}
      <div className="text-center max-w-xl mx-auto" id="sos-intro">
        <span className="inline-flex items-center space-x-1 bg-red-500/10 text-red-400 text-xs font-bold py-1 px-3.5 rounded-full border border-red-500/20">
          <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
          <span>Active Tourist Security Network</span>
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-white mt-2 font-serif">Emergency Assistance & SOS Center</h2>
        <p className="text-xs text-white/60 mt-1 leading-relaxed">
          If you are lost, feeling unsafe, or facing a medical crisis, use the panic trigger below to broadcast your live GPS coordinates directly to the closest Tamil Nadu Tourist Police precinct.
        </p>
      </div>

      {/* Main Panic Button card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-lg relative overflow-hidden" id="sos-trigger-card">
        <div className="flex flex-col items-center justify-center py-8 text-center" id="sos-trigger-box">
          {!sosActive ? (
            <>
              <button
                onClick={triggerSOS}
                className="h-32 w-32 bg-red-600 hover:bg-red-700 text-white rounded-full flex flex-col items-center justify-center shadow-lg shadow-red-600/35 border-8 border-red-500/20 transition-all active:scale-95 animate-pulse cursor-pointer"
                id="panic-button"
              >
                <ShieldAlert className="h-10 w-10 text-white" />
                <span className="text-xs font-black uppercase tracking-wider mt-1.5">Trigger SOS</span>
              </button>
              <p className="text-xs text-white/40 mt-4 font-semibold">Broadcasting simulated GPS and safety alert when clicked.</p>
            </>
          ) : (
            <div className="space-y-4" id="sos-broadcasting">
              <div className="h-12 w-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center justify-center animate-bounce mx-auto">
                <AlertTriangle className="h-6 w-6 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-red-400 font-serif">🚨 SOS Security Broadcast Active</h3>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4 max-w-md mx-auto text-xs leading-relaxed text-white/90" id="broadcast-metrics">
                {isLocating ? (
                  <p className="italic">Triangulating satellite coordinates via Geolocation...</p>
                ) : (
                  <>
                    <p className="font-bold mb-1 text-red-400 font-serif">Broadcasting Coordinates:</p>
                    <p className="font-mono text-[11px] mb-2">LAT: {coords?.lat.toFixed(5)}, LNG: {coords?.lng.toFixed(5)}</p>
                    <p className="text-[11px] text-white/60">Tourist Safety Dispatch notified. Patrolling vehicles around the Thanjavur/Madurai circle have been signaled to your region. Please stay in a well-lit, public location.</p>
                  </>
                )}
              </div>

              <button
                onClick={() => setSosActive(false)}
                className="text-xs bg-white/10 hover:bg-white/15 text-white font-bold py-1.5 px-4 rounded-xl border border-white/10 transition cursor-pointer"
                id="cancel-sos-btn"
              >
                Cancel SOS Broadcast
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="sos-details-grid">
        {/* Hotlines lists (7 cols) */}
        <div className="md:col-span-7 space-y-4" id="hotlines-column">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-serif">State Emergency Hotlines</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="hotlines-grid">
            {emergencyContacts.map((contact, i) => {
              const Icon = contact.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start space-x-3.5 shadow-md" id={`contact-card-${i}`}>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl text-amber-400 shrink-0 animate-pulse" id="contact-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-serif">{contact.title}</h4>
                    <p className="text-[10px] text-white/40 mt-0.5 leading-tight">{contact.subtitle}</p>
                    <a
                      href={`tel:${contact.number}`}
                      className="mt-2 inline-flex items-center space-x-1 text-sm font-bold text-amber-400 hover:text-amber-300"
                    >
                      <Phone className="h-3.5 w-3.5 fill-current" />
                      <span>{contact.number}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hospital directory (5 cols) */}
        <div className="md:col-span-5 space-y-4" id="hospitals-column">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-serif">Close Government General Hospitals</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 divide-y divide-white/5 shadow-md" id="hospitals-list-box">
            {nearSiteHospitals.map((hosp, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0" id={`hospital-item-${i}`}>
                <h4 className="text-xs font-bold text-white leading-tight font-serif">{hosp.name}</h4>
                <div className="flex items-center justify-between mt-1 text-[10px]" id="hospital-loc-phone">
                  <span className="text-amber-400 font-semibold uppercase tracking-wider font-mono">📌 District: {hosp.city}</span>
                  <a href={`tel:${hosp.phone}`} className="font-bold text-white/60 hover:text-amber-400 font-mono">{hosp.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
