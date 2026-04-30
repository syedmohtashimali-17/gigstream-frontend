import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

function Sidebar({
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

  // Available skills (you'll aggregate these from your backend)
  const availableSkills = [
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'Python',
    'TypeScript',
    'JavaScript',
    'CSS',
    'Tailwind CSS',
    'PostgreSQL',
    'MongoDB',
    'React Native',
    'Firebase',
    'Docker',
  ];

  const platforms = ['Upwork', 'Freelancer'];

  // Check if any filters are active
  const hasActiveFilters = selectedPlatforms.length > 0 || selectedSkills.length > 0 ||
    budgetRange[0] > 0 || budgetRange[1] < 10000;

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-6 h-screen overflow-y-auto sticky top-20">
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
  );
}

export default Sidebar;
