import React from 'react';
import { sponsorsData } from '../data';
import { ExternalLink } from 'lucide-react';
import { Sponsor } from '../types';

interface SponsorCardProps {
  sponsor: Sponsor;
  size: 'lg' | 'md' | 'sm';
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, size }) => {
  const logoSize = {
    lg: 'h-24',
    md: 'h-16', 
    sm: 'h-12'
  }[size];

  return (
    <a 
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all active:scale-[0.98] group"
    >
      {sponsor.logo ? (
        <div className={`flex items-center justify-center mb-3 ${logoSize}`}>
          <img 
            src={sponsor.logo} 
            alt={`${sponsor.name} logo`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : (
        <div className={`
          font-bold text-gray-800 group-hover:text-[#1E4D2B] transition-colors
          ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base'}
        `}>
          {sponsor.name}
        </div>
      )}
      
      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400 group-hover:text-[#C8C372]">
        <span>Visit Website</span>
        <ExternalLink size={10} />
      </div>
    </a>
  );
};

export default function SponsorsView() {
  const goldSponsors = sponsorsData.filter(s => s.level === 'Gold');
  const greenSponsors = sponsorsData.filter(s => s.level === 'Green');
  const friendSponsors = sponsorsData.filter(s => s.level === 'Friend');

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-10 text-center">
      {/* Header with thank you message */}
      <div className="bg-[#1E4D2B] text-white p-8 rounded-2xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Thank You to Our Sponsors</h2>
        <p className="text-green-100 text-lg leading-relaxed">
          We are grateful for the generous support of our sponsors who make Research Day 2026 possible. 
          Their commitment to advancing veterinary research and education helps us showcase the innovative 
          work of our trainees and faculty.
        </p>
      </div>

      {/* Gold Sponsors */}
      {goldSponsors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px bg-yellow-400 w-12"></div>
            <h3 className="text-xl font-bold text-yellow-600 uppercase tracking-widest">Gold Sponsors</h3>
            <div className="h-px bg-yellow-400 w-12"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {goldSponsors.map((s, i) => <SponsorCard key={i} sponsor={s} size="lg" />)}
          </div>
        </div>
      )}

      {/* Green Sponsors */}
      {greenSponsors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px bg-green-600 w-12"></div>
            <h3 className="text-lg font-bold text-green-800 uppercase tracking-widest">Green Sponsors</h3>
            <div className="h-px bg-green-600 w-12"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
            {greenSponsors.map((s, i) => <SponsorCard key={i} sponsor={s} size="md" />)}
          </div>
        </div>
      )}

      {/* Friend Sponsors */}
      {friendSponsors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px bg-gray-300 w-12"></div>
            <h3 className="text-base font-bold text-gray-500 uppercase tracking-widest">Friends of Research Day</h3>
            <div className="h-px bg-gray-300 w-12"></div>
          </div>
          <div className="grid gap-4 max-w-sm mx-auto">
            {friendSponsors.map((s, i) => <SponsorCard key={i} sponsor={s} size="sm" />)}
          </div>
        </div>
      )}
    </div>
  );
}
