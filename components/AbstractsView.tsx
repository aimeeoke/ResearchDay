import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { abstractsData } from '../data';
import { Abstract, ResearchType } from '../types';

interface Props {
  onAbstractClick: (abstract: Abstract) => void;
}

export default function AbstractsView({ onAbstractClick }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Multi-select filter state
  const [filters, setFilters] = useState({
    department: '',
    researchType: '',
    mentor: '',
    affiliation: ''
  });

  // Extract unique values for dropdowns - THIS IS THE KEY FIX
  const options = useMemo(() => {
    const depts = new Set<string>();
    const mentors = new Set<string>();
    const affiliations = new Set<string>();

    abstractsData.forEach(a => {
      depts.add(a.presenter.department);
      a.mentors.forEach(m => mentors.add(m));
      a.affiliations.forEach(aff => affiliations.add(aff));
    });

    return {
      departments: Array.from(depts).sort(),
      researchTypes: Object.values(ResearchType),
      mentors: Array.from(mentors).sort((a, b) => {
      38 +        const lastNameA = a.split(' ').pop() || a;
      39 +        const lastNameB = b.split(' ').pop() || b;
      40 +        return lastNameA.localeCompare(lastNameB);
      41 +      }),
      affiliations: Array.from(affiliations).sort()
    };
  }, []);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const clearFilters = () => {
    setFilters({ department: '', researchType: '', mentor: '', affiliation: '' });
    setSearchTerm('');
  };

  const filteredAbstracts = useMemo(() => {
    return abstractsData.filter(abstract => {
      // 1. Robust Search Logic
      const matchesSearch = (() => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase().trim();
        
        // Normalize strings for flexible poster matching (e.g. "Poster # 1", "Poster 1", "1")
        const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        const slotNormalized = normalize(abstract.presentationSlot);
        const termNormalized = normalize(term);
        
        // Special check: if searching for a number like "1", check if slot is "poster#1" or just "1"
        // If term is "1", termNormalized is "1". slot "Poster # 1" -> "poster1".
        // "poster1".includes("1") is true.
        // If term is "poster 1", termNormalized is "poster1". "poster1".includes("poster1") is true.
        const isSlotMatch = slotNormalized.includes(termNormalized);

        // Standard checks
        const isTitleMatch = abstract.title.toLowerCase().includes(term);
        const isPresenterMatch = abstract.presenter.name.toLowerCase().includes(term);
        const isIdMatch = abstract.id.toLowerCase().includes(term);
        
        return isTitleMatch || isPresenterMatch || isSlotMatch || isIdMatch;
      })();

      // 2. Multi-category Filtering
      const matchesDepartment = !filters.department || abstract.presenter.department === filters.department;
      const matchesType = !filters.researchType || abstract.researchType === filters.researchType;
      const matchesMentor = !filters.mentor || abstract.mentors.includes(filters.mentor);
      const matchesAffiliation = !filters.affiliation || abstract.affiliations.includes(filters.affiliation);

      return matchesSearch && matchesDepartment && matchesType && matchesMentor && matchesAffiliation;
    });
  }, [searchTerm, filters]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Search and Filter Controls */}
      <div className="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by title, presenter, or poster # (e.g. 'Poster 1')"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E4D2B] focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 rounded-lg border shadow-sm flex items-center gap-2 transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'bg-[#1E4D2B] text-white border-[#1E4D2B]'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <Filter size={20} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-[#1E4D2B] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Drawer */}
        {showFilters && (
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 animate-in fade-in slide-in-from-top-2">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Department</label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#1E4D2B] bg-white"
                  value={filters.department}
                  onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                >
                  <option value="">All Departments</option>
                  {options.departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Research Type</label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#1E4D2B] bg-white"
                  value={filters.researchType}
                  onChange={(e) => setFilters(prev => ({ ...prev, researchType: e.target.value }))}
                >
                  <option value="">All Research Types</option>
                  {options.researchTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mentor</label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#1E4D2B] bg-white"
                  value={filters.mentor}
                  onChange={(e) => setFilters(prev => ({ ...prev, mentor: e.target.value }))}
                >
                  <option value="">All Mentors</option>
                  {options.mentors.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Affiliation</label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#1E4D2B] bg-white"
                  value={filters.affiliation}
                  onChange={(e) => setFilters(prev => ({ ...prev, affiliation: e.target.value }))}
                >
                  <option value="">All Affiliations</option>
                  {options.affiliations.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
              <span className="text-xs text-gray-500">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
              <button 
                onClick={clearFilters}
                className="text-sm font-medium text-[#1E4D2B] hover:text-[#153820] hover:underline transition-all"
              >
                Reset all
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Abstract List */}
      <div className="space-y-4">
        <p className="text-sm text-gray-500 font-medium px-1">
          Showing {filteredAbstracts.length} result{filteredAbstracts.length !== 1 ? 's' : ''}
        </p>
        
        {filteredAbstracts.map((abstract) => (
          <div 
            key={abstract.id}
            onClick={() => onAbstractClick(abstract)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 active:scale-[0.99] transition-transform cursor-pointer hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                abstract.presentationType === 'Oral' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
              }`}>
                {abstract.presentationSlot}
              </span>
              <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
                {abstract.researchType.split(' ')[0]}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
              {abstract.title}
            </h3>
            
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <span className="font-semibold text-[#1E4D2B] mr-2">{abstract.presenter.name}</span>
              <span className="text-gray-400">•</span>
              <span className="ml-2 text-xs truncate">{abstract.presenter.department}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span>Mentor: {abstract.mentors[0]}</span>
                {abstract.mentors.length > 1 && <span> et al.</span>}
              </div>
              {abstract.location && (
                <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded">
                  {abstract.location}
                </span>
              )}
            </div>
          </div>
        ))}

        {filteredAbstracts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-4 rounded-full inline-block mb-3">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No abstracts found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
