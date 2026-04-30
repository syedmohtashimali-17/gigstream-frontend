import { Search } from 'lucide-react';

function Navbar({ searchQuery, onSearchChange }) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* flex-wrap add kiya taake mobile par cheezein adjust ho sakein */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 md:gap-6">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            {/* Mobile par logo text thora chota kar diya */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Gig<span className="text-blue-600">Stream</span>
            </h1>
          </div>

          {/* Search Bar - Mobile par ye order 3 ho jayega (yani niche chala jayega) */}
          <div className="order-3 md:order-2 w-full md:flex-1 md:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
              />
            </div>
          </div>

          {/* Right Actions - Mobile par ye order 2 ho jayega */}
          <div className="order-2 md:order-3 flex items-center gap-2 md:gap-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition text-sm hidden sm:block">
              Posts
            </button>
            <button className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-xs md:text-sm whitespace-nowrap">
              Post Job
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;