# 🎯 GigStream - API Integration Quick Reference

## Replace Mock Jobs with Backend

### Location: `src/App.jsx` - Lines 24-45

**Current Code (Development):**
```javascript
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
    setError('Failed to load jobs. Please try again later.');
    // USE MOCK DATA DURING DEVELOPMENT IF BACKEND IS NOT AVAILABLE
    setJobs(MOCK_JOBS);
    setFilteredJobs(MOCK_JOBS);
  } finally {
    setLoading(false);
  }
};
```

### Step-by-Step Replacement Guide

#### Step 1️⃣: Update the API URL
```javascript
// Change this line:
const response = await axios.get('http://localhost:8000/api/jobs', {

// To your backend URL:
const response = await axios.get('http://your-backend-url/api/jobs', {
```

**Examples:**
```javascript
// Local development
const response = await axios.get('http://localhost:8000/api/jobs', {

// Production
const response = await axios.get('https://api.yourdomain.com/jobs', {

// Docker container
const response = await axios.get('http://backend:8000/api/jobs', {
```

---

#### Step 2️⃣: Handle Your Data Format

**If your backend returns an array directly:**
```javascript
// ✅ This works as-is
const jobsData = Array.isArray(response.data) ? response.data : response.data.data || [];
```

**If your backend returns `{ jobs: [...] }`:**
```javascript
// 🔧 Change to:
const jobsData = response.data.jobs || [];
```

**If your backend returns `{ data: { results: [...] } }`:**
```javascript
// 🔧 Change to:
const jobsData = response.data.data?.results || [];
```

**If your backend uses pagination:**
```javascript
// 🔧 Change to:
const jobsData = response.data.results || response.data.data || [];
// Then update state to handle pagination
```

---

#### Step 3️⃣: Add Request Headers (if needed)

**With Authentication Token:**
```javascript
const response = await axios.get('http://localhost:8000/api/jobs', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
```

**With API Key:**
```javascript
const response = await axios.get('http://localhost:8000/api/jobs', {
  headers: {
    'X-API-Key': process.env.REACT_APP_API_KEY,
  },
  timeout: 10000,
});
```

---

#### Step 4️⃣: Add Query Parameters (Pagination, Filtering)

```javascript
const response = await axios.get('http://localhost:8000/api/jobs', {
  params: {
    page: 1,
    limit: 20,
    platform: 'Upwork',      // Optional: backend-side filtering
    sort: 'recent',           // Optional: sorting
  },
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  timeout: 10000,
});
```

---

## 🔄 Complete Working Example

### Frontend (React)
```javascript
// In src/App.jsx
const fetchJobs = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get('https://api.example.com/v1/jobs', {
      params: {
        page: 1,
        limit: 50,
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      timeout: 10000,
    });
    
    // YOUR DATA FORMAT - Update this based on your backend response
    const jobsData = response.data.jobs || [];
    
    setJobs(jobsData);
    setFilteredJobs(jobsData);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    setError('Failed to load jobs. Please try again later.');
    // Fallback to mock data during development
    setJobs(MOCK_JOBS);
    setFilteredJobs(MOCK_JOBS);
  } finally {
    setLoading(false);
  }
};
```

### Backend (Python/FastAPI)
```python
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/v1/jobs")
async def get_jobs(
    page: int = Query(1),
    limit: int = Query(50),
):
    """Fetch all jobs with pagination"""
    
    # Your database query here
    jobs = fetch_jobs_from_db(page=page, limit=limit)
    
    return {
        "jobs": jobs,
        "total": len(jobs),
        "page": page
    }
```

---

## 🧪 Testing Your Integration

### Step 1: Verify Backend is Running
```bash
curl http://localhost:8000/api/jobs
```

You should see JSON data.

### Step 2: Check Browser Console
Open DevTools (F12) → Console tab → Look for:
```
✅ "Jobs loaded successfully"
❌ "Error fetching jobs: ..."
```

### Step 3: Check Network Tab
1. Open DevTools → Network tab
2. Refresh page
3. Look for request to `/api/jobs`
4. Check Response tab for your data

### Step 4: Test with Mock Data First
Temporarily comment out the fetch:
```javascript
// const response = await axios.get(...)
// Use mock instead to verify UI works
setJobs(MOCK_JOBS);
setFilteredJobs(MOCK_JOBS);
```

---

## 💾 Environment Variables (Optional)

Create `.env` file in project root:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_KEY=your-api-key-here
```

Use in code:
```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL;

const response = await axios.get(`${API_URL}/api/jobs`, {
  // ...
});
```

---

## 🔐 Security Considerations

1. **Never commit API keys:**
   ```env
   # .gitignore
   .env
   .env.local
   .env.*.local
   ```

2. **Use environment variables in production:**
   ```javascript
   const apiUrl = import.meta.env.PROD 
     ? 'https://api.production.com' 
     : 'http://localhost:8000';
   ```

3. **Validate data before displaying:**
   ```javascript
   const validateJob = (job) => {
     return job.id && job.title && job.description;
   };
   
   const validJobs = jobsData.filter(validateJob);
   ```

---

## 🚀 Deployment Checklist

- [ ] Update API URL to production endpoint
- [ ] Verify CORS is configured for your domain
- [ ] Add error handling for network timeouts
- [ ] Test loading states with slow network (DevTools → Throttle)
- [ ] Verify pagination (if applicable)
- [ ] Check data validation
- [ ] Monitor console for errors in production
- [ ] Set up logging for failed requests

---

## Exact File Locations

- **Main API Call:** [src/App.jsx](src/App.jsx#L24)
- **Mock Data:** [src/App.jsx](src/App.jsx#L160)
- **UI Components:**
  - [src/components/JobCard.jsx](src/components/JobCard.jsx) - Individual job display
  - [src/components/Navbar.jsx](src/components/Navbar.jsx) - Search header
  - [src/components/Sidebar.jsx](src/components/Sidebar.jsx) - Filters

---

## 🎓 Key Concepts

### useEffect Hook (Fetch on Mount)
```javascript
useEffect(() => {
  fetchJobs();  // Runs when component first mounts
}, []);        // Empty array = run once
```

### State Management
```javascript
const [jobs, setJobs] = useState([]);           // Original data
const [filteredJobs, setFilteredJobs] = useState([]); // Filtered data
const [loading, setLoading] = useState(false);  // Loading state
const [error, setError] = useState(null);       // Error state
```

### Filtering Logic (useEffect)
```javascript
useEffect(() => {
  let filtered = jobs;
  
  // Apply filters
  if (searchQuery) filtered = filtered.filter(...);
  if (selectedPlatforms.length > 0) filtered = filtered.filter(...);
  
  setFilteredJobs(filtered);  // Update filtered list
}, [jobs, searchQuery, selectedPlatforms]); // Re-run when these change
```

---

## 📊 Expected Response Format (Reference)

```json
{
  "jobs": [
    {
      "id": 1,
      "title": "React Dashboard",
      "description": "Build a dashboard with real-time data...",
      "skills": ["React", "JavaScript", "Tailwind CSS"],
      "budget": "1500-2500",
      "platform": "Upwork",
      "company": "Company Name",
      "level": "Intermediate"
    }
  ],
  "total": 100,
  "page": 1
}
```

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CORS error | Enable CORS on backend, add frontend URL to allowed origins |
| 404 error | Check API endpoint URL is correct |
| Empty jobs list | Verify backend data format matches expected structure |
| Filters not working | Check data types (skills should be array, budget should be string) |
| Slow loading | Check timeout value, consider adding pagination |

---

**Last Updated:** 2024
**Status:** Ready to Integrate ✅
