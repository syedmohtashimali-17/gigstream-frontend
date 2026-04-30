import { Search } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:block">
              GigStream
            </span>
          </div>

          {/* Search Bar (Centered) */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Right Section: Mobile Filter & Buttons */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button (Visible only on mobile) */}
            <button className="md:hidden flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <span>Filters</span>
            </button>

            <button className="text-gray-600 font-medium hover:text-blue-600 transition px-2 hidden sm:block">
              Posts
            </button>
            
            <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm hover:shadow-md whitespace-nowrap text-sm sm:text-base">
              Post Job
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Only visible on small screens) */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;