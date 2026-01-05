import React from 'react';
import { sponsorsData } from '../data';
import { ExternalLink } from 'lucide-react';
import { Sponsor } from '../types';

interface SponsorCardProps {
  sponsor: Sponsor;
  size: 'lg' | 'md' | 'sm';
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, size }) => (
  <a 
    href={sponsor.url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all active:scale-[0.98] group"
  >
    <div className={`
      font-bold text-gray-800 group-hover:text-[#1E4D2B] transition-colors
      ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base'}
    `}>
      {sponsor.name}
    </div>
    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400 group-hover:text-[#C8C372]">
      <span>Visit Website</span>
      <ExternalLink size={10} />
    </div>
  </a>
);

export default function SponsorsView() {
  const goldSponsors = sponsorsData.filter(s => s.level === 'Gold');
  const greenSponsors = sponsorsData.filter(s => s.level === 'Green');
  const friendSponsors = sponsorsData.filter(s => s.level === 'Friend');

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-10 text-center">
      <div className="bg-[#1E4D2B] text-white p-8 rounded-2xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-2">Event Sponsors</h2>
        <p className="text-green-100">Thank you to our partners for making Research Day 2026 possible.</p>
      </div>

      {goldSponsors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px bg-yellow-400 w-12"></div>
            <h3 className="text-xl font-bold text-yellow-600 uppercase tracking-widest">Gold Sponsors</h3>
            <div className="h-px bg-yellow-400 w-12"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {goldSponsors.map((s, i) => <SponsorCard key={i} sponsor={s} size="lg" />)}
          </div>
        </div>
      )}

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