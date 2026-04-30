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
  
  // Filter states
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [budgetRange, setBudgetRange] = useState([0, 10000]);

  // ============ FETCH DATA FROM BACKEND ============
  useEffect(() => {
    fetchJobs();
  }, []); // Run once on component mount

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      // REPLACE THIS URL WITH YOUR PYTHON BACKEND ENDPOINT
      const response = await axios.get('http://localhost:8000/api/jobs', {
        timeout: 10000,
      });
      
      // Assuming your backend returns: { data: [...jobs] }
      const jobsData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      // USE MOCK DATA DURING DEVELOPMENT IF BACKEND IS NOT AVAILABLE
      console.log('Using mock data...');
      setJobs(MOCK_JOBS);
      setFilteredJobs(MOCK_JOBS);
      // Don't show error if we successfully loaded mock data
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  // ============ FILTERING LOGIC ============
  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          (job.skills && job.skills.some(skill => skill.toLowerCase().includes(query)))
      );
    }

    // Platform filter
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(job => selectedPlatforms.includes(job.platform));
    }

    // Budget filter
    filtered = filtered.filter(job => {
      const budget = parseFloat(job.budget) || 0;
      return budget >= budgetRange[0] && budget <= budgetRange[1];
    });

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(job =>
        job.skills && selectedSkills.some(skill => job.skills.includes(skill))
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, selectedPlatforms, selectedSkills, budgetRange]);

  // ============ FILTER HANDLERS ============
  const handlePlatformChange = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSkillChange = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
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
      {/* Navbar */}
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Container */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          selectedPlatforms={selectedPlatforms}
          onPlatformChange={handlePlatformChange}
          selectedSkills={selectedSkills}
          onSkillChange={handleSkillChange}
          budgetRange={budgetRange}
          onBudgetChange={setBudgetRange}
          onClearFilters={handleClearFilters}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Available Jobs</h1>
            <p className="text-gray-600 mt-1">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
              <button
                onClick={fetchJobs}
                className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Jobs List */}
          {!loading && filteredJobs.length > 0 && (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredJobs.length === 0 && jobs.length > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No jobs match your filters.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && jobs.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No jobs available at the moment.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ============ MOCK DATA (use during development) ============
const MOCK_JOBS = [
  {
    id: 1,
    title: 'React Dashboard for E-commerce Analytics',
    description: 'Build a comprehensive dashboard with real-time data visualization and charts for our e-commerce platform.',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    budget: '1500-2500',
    platform: 'Upwork',
    company: 'StartupXYZ',
    level: 'Intermediate',
  },
  {
    id: 2,
    title: 'Full-Stack MERN Payment Integration',
    description: 'Integrate Stripe payment gateway into existing MERN application with webhook support.',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    budget: '2000-3000',
    platform: 'Freelancer',
    company: 'FinTech Inc',
    level: 'Advanced',
  },
  {
    id: 3,
    title: 'WordPress Blog Customization',
    description: 'Customize WordPress theme for business blog with custom post types and SEO optimization.',
    skills: ['WordPress', 'PHP', 'CSS'],
    budget: '500-1000',
    platform: 'Freelancer',
    company: 'BlogCo',
    level: 'Beginner',
  },
  {
    id: 4,
    title: 'Vue.js Component Library',
    description: 'Design and develop reusable Vue.js components for our product design system.',
    skills: ['Vue.js', 'JavaScript', 'Storybook'],
    budget: '3000-5000',
    platform: 'Upwork',
    company: 'DesignStudio',
    level: 'Advanced',
  },
  {
    id: 5,
    title: 'TypeScript API Development',
    description: 'Build RESTful APIs using TypeScript, Express, and PostgreSQL for mobile app backend.',
    skills: ['TypeScript', 'Express.js', 'PostgreSQL'],
    budget: '2500-4000',
    platform: 'Upwork',
    company: 'MobileApp Co',
    level: 'Intermediate',
  },
  {
    id: 6,
    title: 'React Native Mobile App',
    description: 'Develop cross-platform mobile app for iOS and Android using React Native.',
    skills: ['React Native', 'JavaScript', 'Firebase'],
    budget: '4000-6000',
    platform: 'Freelancer',
    company: 'TechStartup',
    level: 'Advanced',
  },
];

export default App;
