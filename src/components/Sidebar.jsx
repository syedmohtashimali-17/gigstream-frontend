import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

function Sidebar({
  isOpen, // Naya Prop: Ye check karega sidebar khuli hai ya nahi
  onClose, // Naya Prop: Sidebar band karne ka function
  selectedPlatforms,
  onPlatformChange,
  selectedSkills,
  onSkillChange,
  budgetRange,
  onBudgetChange,
  onClearFilters,
}) {
  const [expandedSections, setExpandedSections] = useState({
    platform: true,
    skills: true,
    budget: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const availableSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python',
    'TypeScript', 'JavaScript', 'CSS', 'Tailwind CSS',
    'PostgreSQL', 'MongoDB', 'React Native', 'Firebase', 'Docker',
  ];

  const platforms = ['Upwork', 'Freelancer'];

  const hasActiveFilters = selectedPlatforms.length > 0 || selectedSkills.length > 0 ||
    budgetRange[0] > 0 || budgetRange[1] < 10000;

  return (
    <>
      {/* 1. Mobile Overlay: Jab sidebar khule toh piche ka hissa kala ho jaye */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 2. Sidebar Main Container */}
      <aside className={`
        fixed md:sticky top-0 md:top-20 z-50 md:z-0
        w-72 h-screen bg-white border-r border-gray-200 p-6 
        overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:block
      `}>
        
        {/* Mobile Header: Sirf mobile par nazar aayega Sidebar ke andar */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition font-medium text-sm"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}

        {/* Platform Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('platform')}
            className="flex justify-between items-center w-full mb-3 hover:text-blue-600 transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Platform</h3>
            <ChevronDown
              size={18}
              className={`transition transform ${expandedSections.platform ? 'rotate-180' : ''}`}
            />
          </button>

          {expandedSections.platform && (
            <div className="space-y-2">
              {platforms.map(platform => (
                <label key={platform} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={() => onPlatformChange(platform)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 transition">{platform}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Budget Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('budget')}
            className="flex justify-between items-center w-full mb-3 hover:text-blue-600 transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Budget</h3>
            <ChevronDown
              size={18}
              className={`transition transform ${expandedSections.budget ? 'rotate-180' : ''}`}
            />
          </button>

          {expandedSections.budget && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Min: ${budgetRange[0].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={budgetRange[0]}
                  onChange={(e) => onBudgetChange([parseInt(e.target.value), budgetRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Max: ${budgetRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={budgetRange[1]}
                  onChange={(e) => onBudgetChange([budgetRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Skills Filter */}
        <div>
          <button
            onClick={() => toggleSection('skills')}
            className="flex justify-between items-center w-full mb-3 hover:text-blue-600 transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            <ChevronDown
              size={18}
              className={`transition transform ${expandedSections.skills ? 'rotate-180' : ''}`}
            />
          </button>

          {expandedSections.skills && (
            <div className="space-y-2">
              {availableSkills.map(skill => (
                <label key={skill} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => onSkillChange(skill)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 transition">{skill}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;