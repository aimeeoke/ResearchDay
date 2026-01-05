import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronUp } from 'lucide-react';
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

  // Fixed department list
  const departments = [
    'Biomedical Sciences',
    'Clinical Sciences',
    'Environmental & Radiological Health Sciences',
    'Microbiology, Immunology, and Pathology',
    'Other'
  ];

  // Curated mentor list (alphabetized)
  const mentors = [
    "A Russell Moore", "Abdullatif Alsulami", "Adam Chicco", "Adam Harris", "Alexander Brandl", 
    "Amanda Woerman", "Amy MacNeill", "Ana Clara Bobadilla", "Andrea Oliver", "Andres Bonilla", 
    "Angela Bosco-Lauth", "Anne Avery", "Ashley McGrew", "Barbara Wolfe", "Ben Giese", 
    "Brad Borlee", "Brendan Podell", "Bret Smith", "Brian Foy", "Camille Torres-Henderson", 
    "Candace Mathiason", "Carleigh Fedorka", "Carol Wilusz", "Carolina Mehaffy", "Caroline Kern-Allely", 
    "Casey Gries", "Catriona MacPhail", "Christianne Magee", "Christie Mayo", "Christopher Kawcak", 
    "Christopher Vaaga", "Claire de La Serre", "Claudia Wiese", "Colleen Duncan", "Dan Frazen", 
    "Dan Regan", "Danielle Buttke", "Danielle Frey", "Dawit Tesfaye", "Debbie Lee", 
    "Del Leary", "Delaney Worthington", "Donovan Anderson", "Douglas Thamm", "Drew Koch", 
    "Elaine Carnevale", "Elissa Randall", "Elizabeth Arnett-Chin", "Emily Gallichotte", "Emily Perkins", 
    "Emily Rout", "Erin McNulty", "Fiona Hollinshead", "Gary Luckasen", "Gayathriy Balamayooran", 
    "Gregory Ebel", "James Larkin", "Jaret Pullen", "Jason Bleedorn", "Jason Lombard", 
    "Jayne Aiken", "Jennifer Hatzel", "Jennifer Hawley", "Jennifer Peel", "Jenny Sones", 
    "Jeremiah Easley", "Jessica Metcalf", "John Belisle", "Joseph Westrich", "Joshua Schaeffer", 
    "Jozsef Vigh", "Julie Moreno", "Julien Guillaumin", "Kalani Williams", "Kapahi Kawai Puaa", 
    "Karen Dobos", "Karen Fox", "Kat Forrest", "Kathryn Wotman", "Kathy Whitman", 
    "Katie Seabaugh", "Katie Sikes", "Katja Sutherland", "Katriana Popichak", "Keara Boss", 
    "Kelly Hall", "Kelly Santangelo", "Kelly Sullivan", "Kim Baker", "Kristin Zersen", 
    "Laura Ashton", "Laura Pulscher", "Lauren Luedke", "Lauren Young", "Linda Dillenbeck", 
    "Lori Kogan", "Lucas Argueso", "Luisa M. Nieto Ramirez", "Luke Bass", "Luke Montrose", 
    "Lynn Pezzanite", "Mark Erickson", "Mark Stenglein", "Mark Zabel", "Marlis Rezende", 
    "Matthew Jorgensen", "Mercedes Gonzalez-Juarrero", "Michael Lappin", "Michael Leibowitz", "Michelle Savran", 
    "Miranda Sadar", "Mo Salman", "Morgan Valley", "Natalie Urie", "Nathaniel Denkers", 
    "Nicole Kelp", "Noelia Altina", "Olivia Arnold", "Petra Cerna", "Philip Purdy", 
    "Phillida Charley", "Purva Sanghvi", "Raissa Chunko", "Ralf Sudowe", "Raven McGann", 
    "Raymond Goodrich", "Rebecca Makii", "Rebecca Niemiec", "Rebekah Kading", "Richard Bowen", 
    "Richard McCosh", "Ron Tjalkens", "Rushika Perera", "Ryan Eastman", "Ryan Sadler", 
    "Samantha Beeson", "Samantha Evans", "Sangeeta Rao", "Sarah Marvel", "Sarah Raabis", 
    "Sarah Shropshire", "Sean Boland", "Seonil Kim", "Shari Lanning", "Sheryl Magzamen", 
    "Stephanie McGrath", "Steven Dow", "Stuart Tobet", "Sue VandeWoude", "Susan Bailey", 
    "Takamitsu Kato", "Tara Nordgren", "Thomas Johnson", "Tiffany Martin", "Tiffany Weir", 
    "Tom LaRocca", "Tony Schountz", "Tracy Webb", "Treana Mayer", "Valeria Scorza", 
    "Webb Craig", "William Brazile", "Yuichi Onda"
  ];

  // Curated affiliation list (alphabetized)
  const affiliations = [
    "ARBL", "Brain Research Center", "CCTSI T32", "Cardiovascular Research Center", 
    "Center for Companion Animal Studies", "Center for Vector-Borne Infectious Diseases", 
    "Equine Reproduction Laboratory", "Equine Research Laboratories", "Flint Animal Cancer Center", 
    "IDRRTP T32", "IMSD T32", "Infectious Disease Research Center", "MAP ERC", "MARC T34", 
    "MIP URF", "MSTP T32", "Mycobacteria Research Laboratories", "Mycobacterial Research Laboratories", 
    "NIH T35", "Orthopaedic Research Center", "PREP", "Preclinical Surgical Research Lab", 
    "Prion Research Center", "Program for Research in Immunology and Microbiology Education (PRIME)", 
    "Research Innovation Center", "Translational Medicine Institute", "VSSP", 
    "Veterinary Diagnostic Laboratories", "Young Investigators", "qCMB T32"
  ];

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const clearFilters = () => {
    setFilters({ department: '', researchType: '', mentor: '', affiliation: '' });
    setSearchTerm('');
  };

  // Update individual filter
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredAbstracts = useMemo(() => {
    return abstractsData.filter(abstract => {
      // 1. Search Logic
      const matchesSearch = (() => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase().trim();
        
        const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        const slotNormalized = normalize(abstract.presentationSlot);
        const termNormalized = normalize(term);
        
        const isSlotMatch = slotNormalized.includes(termNormalized);
        const isTitleMatch = abstract.title.toLowerCase().includes(term);
        const isPresenterMatch = abstract.presenter.name.toLowerCase().includes(term);
        const isIdMatch = abstract.id.toLowerCase().includes(term);
        
        return isTitleMatch || isPresenterMatch || isSlotMatch || isIdMatch;
      })();

      // 2. Filter Logic
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
              placeholder="Search by title, presenter, or poster #"
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
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Department</label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#1E4D2B] bg-white"
                  value={filters.department}
                  onChange={(e) => updateFilter('department', e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Research Type</label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#1E4D2B] bg-white"
                  value={filters.researchType}
                  onChange={(e) => updateFilter('researchType', e.target.value)}
                >
                  <option value="">All Research Types</option>
                  {Object.values(ResearchType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mentor</label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#1E4D2B] bg-white"
                  value={filters.mentor}
                  onChange={(e) => updateFilter('mentor', e.target.value)}
                >
                  <option value="">All Mentors</option>
                  {mentors.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Affiliation</label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#1E4D2B] bg-white"
                  value={filters.affiliation}
                  onChange={(e) => updateFilter('affiliation', e.target.value)}
                >
                  <option value="">All Affiliations</option>
                  {affiliations.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
              <button 
                onClick={clearFilters}
                className="text-sm font-medium text-[#1E4D2B] hover:text-[#153820] hover:underline transition-all"
              >
                Reset all
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 px-3 py-1.5 rounded-lg"
              >
                <ChevronUp size={16} />
                Close filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 font-medium px-1">
        Showing {filteredAbstracts.length} of {abstractsData.length} abstracts
      </p>

      {/* Abstract List */}
      <div className="space-y-4">
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
              <div>
                <span>
                  {abstract.mentors.length === 1 
                    ? `Mentor: ${abstract.mentors[0]}`
                    : abstract.mentors.length === 2
                    ? `Mentors: ${abstract.mentors[0]}, ${abstract.mentors[1]}`
                    : `Mentors: ${abstract.mentors[0]}, ${abstract.mentors[1]} et al.`
                  }
                </span>
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
