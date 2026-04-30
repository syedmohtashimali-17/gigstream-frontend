import { MapPin, Briefcase, TrendingUp } from 'lucide-react';

function JobCard({ job }) {
  // Parse budget range
  const formatBudget = (budgetStr) => {
    if (!budgetStr) return 'Contact for rate';
    return `$${budgetStr.replace(/\s/g, '')}`;
  };

  // Platform badge styling
  const getPlatformStyles = (platform) => {
    switch (platform) {
      case 'Upwork':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Freelancer':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Level badge styling
  const getLevelStyles = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700';
      case 'Advanced':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 hover:border-blue-300">
      {/* Top Row: Title, Platform Badge, Budget */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer transition-colors">
            {job.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{job.company}</p>
        </div>
        
        {/* Platform Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getPlatformStyles(job.platform)}`}>
          {job.platform}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
        {job.description}
      </p>

      {/* Skills Pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {job.skills && job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 cursor-pointer transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Bottom Row: Level, Meta Info, Budget */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <div className="flex items-center gap-3">
          {/* Level Badge */}
          {job.level && (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelStyles(job.level)}`}>
              {job.level}
            </span>
          )}
          
          {/* Info Icons */}
          <div className="flex items-center gap-4 text-gray-600 text-xs">
            <div className="flex items-center gap-1">
              <Briefcase size={14} />
              <span>Project</span>
            </div>
          </div>
        </div>

        {/* Budget Display */}
        <div className="text-right">
          <p className="text-lg font-bold text-blue-600">
            {formatBudget(job.budget)}
          </p>
          <p className="text-xs text-gray-500">Fixed Price</p>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
