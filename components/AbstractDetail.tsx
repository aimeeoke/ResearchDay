import React from 'react';
import { Abstract } from '../types';
import { MapPin, User, Users, GraduationCap, Building2 } from 'lucide-react';

interface Props {
  abstract: Abstract;
}

export default function AbstractDetail({ abstract }: Props) {
  return (
    <div className="bg-white min-h-full pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="p-6 space-y-6">
          
          {/* Header Info */}
          <div className="space-y-4 border-b border-gray-100 pb-6">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#1E4D2B] text-white text-sm font-bold rounded-full">
                {abstract.presentationSlot}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {abstract.researchType}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {abstract.title}
            </h1>

            <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              {abstract.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#C8C372]" />
                  <span>{abstract.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Presenter & Authors */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <User size={16} /> Presenter
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="font-bold text-lg text-[#1E4D2B]">{abstract.presenter.name}</div>
                <div className="text-gray-600">{abstract.presenter.level}</div>
                <div className="text-gray-500 text-sm mt-1">{abstract.presenter.department}</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users size={16} /> Authors
              </h3>
              <p className="text-gray-800 leading-relaxed italic">
                {abstract.authors}
              </p>
            </div>

            {/* Mentors & Affiliations Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <GraduationCap size={16} /> Mentors
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {abstract.mentors.map((mentor, idx) => (
                    <li key={idx}>{mentor}</li>
                  ))}
                </ul>
              </div>
              {abstract.affiliations.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Building2 size={16} /> Affiliations
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {abstract.affiliations.map((aff, idx) => (
                      <li key={idx}>{aff}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Abstract Body */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Abstract</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
              {abstract.body}
            </p>
          </div>

          {/* Funding */}
          {abstract.funding && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Funding Source</h3>
              <p className="text-sm text-gray-600 bg-green-50 p-3 rounded border border-green-100">
                {abstract.funding}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
