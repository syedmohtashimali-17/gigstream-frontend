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

// ============ MOCK DATA (Testing ke liye zyada jobs) ============
const MOCK_JOBS = [
  {
    id: 1,
    title: 'React Dashboard for E-commerce',
    description: 'Build a comprehensive dashboard with real-time data visualization.',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    budget: '2500',
    platform: 'Upwork',
    company: 'StartupXYZ',
    level: 'Intermediate',
  },
  {
    id: 2,
    title: 'Full-Stack MERN Payment Integration',
    description: 'Integrate Stripe payment gateway into existing MERN application.',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    budget: '4500',
    platform: 'Freelancer',
    company: 'FinTech Inc',
    level: 'Advanced',
  },
  {
    id: 3,
    title: 'WordPress Blog Customization',
    description: 'Customize WordPress theme for business blog with SEO optimization.',
    skills: ['WordPress', 'PHP', 'CSS'],
    budget: '600',
    platform: 'Freelancer',
    company: 'BlogCo',
    level: 'Beginner',
  },
  {
    id: 4,
    title: 'Vue.js Component Library',
    description: 'Design and develop reusable Vue.js components.',
    skills: ['Vue.js', 'JavaScript'],
    budget: '3200',
    platform: 'Upwork',
    company: 'DesignStudio',
    level: 'Advanced',
  },
  {
    id: 5,
    title: 'Python Scraper for Real Estate',
    description: 'Need a python expert to scrape data from 5 different websites.',
    skills: ['Python', 'Docker'],
    budget: '1200',
    platform: 'Upwork',
    company: 'DataMinds',
    level: 'Intermediate',
  },
  {
    id: 6,
    title: 'React Native Delivery App',
    description: 'Food delivery app UI/UX and Firebase integration.',
    skills: ['React Native', 'Firebase', 'JavaScript'],
    budget: '8000',
    platform: 'Freelancer',
    company: 'QuickEats',
    level: 'Advanced',
  },
  {
    id: 7,
    title: 'Landing Page for SaaS',
    description: 'Simple and clean landing page using Tailwind CSS.',
    skills: ['Tailwind CSS', 'JavaScript'],
    budget: '400',
    platform: 'Upwork',
    company: 'CloudSaaS',
    level: 'Beginner',
  },
  {
    id: 8,
    title: 'PostgreSQL Database Optimization',
    description: 'Fix slow queries and optimize database schema.',
    skills: ['PostgreSQL', 'Node.js'],
    budget: '2200',
    platform: 'Freelancer',
    company: 'CoreSystems',
    level: 'Intermediate',
  },
  {
    id: 9,
    title: 'TypeScript API Development',
    description: 'Backend APIs for a fintech mobile application.',
    skills: ['TypeScript', 'Node.js', 'PostgreSQL'],
    budget: '5500',
    platform: 'Upwork',
    company: 'BankIt',
    level: 'Advanced',
  },
  {
    id: 10,
    title: 'Bug Fixing in Angular App',
    description: 'Quick bug fixing in a legacy Angular project.',
    skills: ['Angular', 'TypeScript'],
    budget: '300',
    platform: 'Freelancer',
    company: 'OldCode Co',
    level: 'Intermediate',
  },
  {
    id: 11,
    title: 'Firebase Push Notifications',
    description: 'Setup notifications for Android and iOS using Firebase.',
    skills: ['Firebase', 'React Native'],
    budget: '900',
    platform: 'Upwork',
    company: 'AlertMe',
    level: 'Intermediate',
  },
  {
    id: 12,
    title: 'Modern Portfolio Website',
    description: 'Create a professional portfolio with animations.',
    skills: ['React', 'Tailwind CSS', 'JavaScript'],
    budget: '1500',
    platform: 'Freelancer',
    company: 'CreativeFlow',
    level: 'Beginner',
  }
];

export default App;