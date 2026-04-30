import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import JobCard from './components/JobCard';

function App() {
  // ============ STATE MANAGEMENT ============
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mobile Sidebar State (Naya addition)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter states
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [budgetRange, setBudgetRange] = useState([0, 10000]);

  // ============ FETCH DATA ============
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/api/jobs', {
        timeout: 10000,
      });
      const jobsData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    } catch (err) {
      console.log('Using mock data...');
      setJobs(MOCK_JOBS);
      setFilteredJobs(MOCK_JOBS);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  // ============ FILTERING LOGIC ============
  useEffect(() => {
    let filtered = jobs;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          (job.skills && job.skills.some(skill => skill.toLowerCase().includes(query)))
      );
    }

    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(job => selectedPlatforms.includes(job.platform));
    }

    filtered = filtered.filter(job => {
      const budget = parseFloat(job.budget) || 0;
      return budget >= budgetRange[0] && budget <= budgetRange[1];
    });

    if (selectedSkills.length > 0) {
      filtered = filtered.filter(job =>
        job.skills && selectedSkills.some(skill => job.skills.includes(skill))
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, selectedPlatforms, selectedSkills, budgetRange]);

  // ============ HANDLERS ============
  const handlePlatformChange = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleSkillChange = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedSkills([]);
    setBudgetRange([0, 10000]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar ko function pass kiya taake button click par sidebar khule */}
      <Navbar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        onMenuClick={() => setIsSidebarOpen(true)} 
      />

      <div className="flex relative">
        {/* Sidebar ko status aur close karne ka function diya */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedPlatforms={selectedPlatforms}
          onPlatformChange={handlePlatformChange}
          selectedSkills={selectedSkills}
          onSkillChange={handleSkillChange}
          budgetRange={budgetRange}
          onBudgetChange={setBudgetRange}
          onClearFilters={handleClearFilters}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Available Jobs</h1>
            <p className="text-gray-600 mt-1">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No jobs found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const MOCK_JOBS = [
  { id: 1, title: 'React Dashboard', description: 'Real-time data visualization.', skills: ['React', 'JavaScript', 'Tailwind CSS'], budget: '2000', platform: 'Upwork', company: 'StartupXYZ', level: 'Intermediate' },
  { id: 2, title: 'MERN Integration', description: 'Stripe payment integration.', skills: ['MongoDB', 'Express.js', 'React', 'Node.js'], budget: '2500', platform: 'Freelancer', company: 'FinTech Inc', level: 'Advanced' }
];

export default App;