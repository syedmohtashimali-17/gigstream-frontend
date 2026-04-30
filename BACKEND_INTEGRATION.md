# GigStream - Backend Integration Guide

## 📋 Overview
This guide shows you exactly how to integrate your Python backend with the GigStream frontend. The frontend is pre-configured with mock data that automatically switches to live API calls when your backend is available.

---

## 🔗 Quick Start - API Endpoint Setup

### Step 1: Update the API Base URL

In [src/App.jsx](App.jsx), find the `fetchJobs` function (around line 24):

```javascript
const response = await axios.get('http://localhost:8000/api/jobs', {
  timeout: 10000,
});
```

**Replace `http://localhost:8000/api/jobs` with your actual backend URL:**
- Local: `http://localhost:8000/api/jobs`
- Production: `https://your-api.com/api/jobs`
- Development Server: `http://192.168.x.x:8000/api/jobs`

---

## 🏗️ Expected Data Structure

Your backend should return jobs in this format:

```json
[
  {
    "id": 1,
    "title": "React Dashboard for E-commerce Analytics",
    "description": "Build a comprehensive dashboard with real-time data visualization...",
    "skills": ["React", "JavaScript", "Tailwind CSS"],
    "budget": "1500-2500",
    "platform": "Upwork",
    "company": "StartupXYZ",
    "level": "Intermediate"
  },
  {
    "id": 2,
    "title": "Full-Stack MERN Payment Integration",
    "description": "Integrate Stripe payment gateway into existing MERN application...",
    "skills": ["MongoDB", "Express.js", "React", "Node.js"],
    "budget": "2000-3000",
    "platform": "Freelancer",
    "company": "FinTech Inc",
    "level": "Advanced"
  }
]
```

### Field Requirements:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | Unique | ✅ | Used as React key |
| `title` | String | ✅ | Job title |
| `description` | String | ✅ | 2-line preview |
| `skills` | Array[String] | ✅ | Used for skill filtering |
| `budget` | String | ✅ | Format: "min-max" or just number |
| `platform` | String | ✅ | Must be "Upwork" or "Freelancer" |
| `company` | String | ✅ | Company/poster name |
| `level` | String | ✅ | "Beginner", "Intermediate", or "Advanced" |

---

## 🐍 Python Backend Example (FastAPI)

Here's a sample Python backend to get you started:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data from your database
JOBS = [
    {
        "id": 1,
        "title": "React Dashboard",
        "description": "Build a dashboard...",
        "skills": ["React", "JavaScript"],
        "budget": "1500-2500",
        "platform": "Upwork",
        "company": "StartupXYZ",
        "level": "Intermediate"
    }
]

@app.get("/api/jobs")
async def get_jobs():
    # TODO: Replace with actual database query
    return JOBS

@app.get("/api/jobs/{job_id}")
async def get_job(job_id: int):
    return next((job for job in JOBS if job["id"] == job_id), None)
```

**Install dependencies:**
```bash
pip install fastapi uvicorn python-multipart
```

**Run server:**
```bash
uvicorn main:app --reload --port 8000
```

---

## 🔄 Handling Different Response Formats

If your backend returns data differently, modify the `fetchJobs` function in [src/App.jsx](App.jsx):

### Format 1: Direct Array
```javascript
const jobsData = Array.isArray(response.data) ? response.data : [];
```

### Format 2: Wrapped in Object
```javascript
const jobsData = response.data.jobs || response.data.data || [];
```

### Format 3: Paginated Response
```javascript
const jobsData = response.data.results || [];
```

---

## 🔍 Filtering and Search

The frontend automatically handles:
- ✅ Text search (title, description, skills)
- ✅ Platform filtering (Upwork/Freelancer)
- ✅ Budget range filtering
- ✅ Skill-based filtering

**To customize available skills**, edit [src/components/Sidebar.jsx](src/components/Sidebar.jsx):

```javascript
const availableSkills = [
  'React',
  'Vue.js',
  'Angular',
  // Add more skills here...
];
```

Or fetch from your backend:

```javascript
const [availableSkills, setAvailableSkills] = useState([]);

useEffect(() => {
  const fetchSkills = async () => {
    const response = await axios.get('http://localhost:8000/api/skills');
    setAvailableSkills(response.data);
  };
  fetchSkills();
}, []);
```

---

## 🧪 Testing & Debugging

### 1. **Check Network Requests**
Open DevTools (F12) → Network tab → Filter by XHR/Fetch

### 2. **Enable Console Logs**
Look for these messages in Console:
```
✅ Jobs loaded successfully
❌ Error fetching jobs: [error details]
```

### 3. **Test with Mock Data**
The app automatically uses mock data if the API fails. Check the browser console for error details.

### 4. **CORS Issues?**
If you see "CORS error", ensure your Python backend has:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🚀 Running Everything Together

### Terminal 1: Python Backend
```bash
cd your-backend-folder
python -m uvicorn main:app --reload --port 8000
```

### Terminal 2: React Frontend
```bash
cd d:\Vite
npm run dev
```

### Terminal 3: (Optional) Database
```bash
# If using PostgreSQL, MongoDB, etc.
```

---

## 📝 Modifying API Calls

### Add Query Parameters (e.g., pagination)
```javascript
const response = await axios.get('http://localhost:8000/api/jobs', {
  params: {
    page: 1,
    limit: 20,
    platform: 'Upwork'
  },
  timeout: 10000,
});
```

### Add Authentication (Bearer Token)
```javascript
const response = await axios.get('http://localhost:8000/api/jobs', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  timeout: 10000,
});
```

### POST Request (Create Job)
```javascript
const createJob = async (jobData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/jobs', jobData);
    console.log('Job created:', response.data);
  } catch (error) {
    console.error('Error creating job:', error);
  }
};
```

---

## 🎨 Customizing UI

### Change Primary Color (Navy Blue → Your Color)
In each component, replace `blue-600` and `blue-100` with your color:

**Example: Change to Green**
```javascript
// Before
className="px-3 py-1 bg-blue-100 text-blue-700"

// After
className="px-3 py-1 bg-green-100 text-green-700"
```

### Update Navbar Logo
Edit [src/components/Navbar.jsx](src/components/Navbar.jsx#L10):

```javascript
<div className="w-8 h-8 bg-blue-600 rounded-lg">
  {/* Replace with your logo or color */}
</div>
```

---

## 📦 Project Structure

```
d:\Vite
├── src/
│   ├── App.jsx                 ← Main component with API calls
│   ├── index.css              ← Tailwind configuration
│   ├── main.jsx               ← Entry point
│   ├── App.css                ← Additional styles (optional)
│   └── components/
│       ├── JobCard.jsx        ← Individual job card
│       ├── Navbar.jsx         ← Search & header
│       └── Sidebar.jsx        ← Filters & categories
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## ✅ Checklist Before Going Live

- [ ] Python backend is serving data at `/api/jobs`
- [ ] CORS is enabled on backend
- [ ] Data structure matches expected format
- [ ] Frontend URL is updated to production API
- [ ] Error handling is tested
- [ ] Loading states work properly
- [ ] Filters and search work with real data
- [ ] Budget formatting works with your data
- [ ] Platform badges show correct platforms

---

## 🆘 Troubleshooting

### Issue: "Failed to load jobs. Please try again later."
1. Check backend is running: `curl http://localhost:8000/api/jobs`
2. Check browser console for detailed error
3. Verify API URL is correct
4. Check CORS headers in response

### Issue: Jobs not filtering properly
1. Verify data structure matches expected format
2. Check platform values are exactly "Upwork" or "Freelancer"
3. Test with mock data first

### Issue: Budget not displaying correctly
1. Ensure budget is a string like "1500-2500"
2. Check for special characters or spaces
3. Use parseFloat() if storing as number

---

## 📞 Support

For issues or questions:
1. Check the browser console (F12)
2. Look at network requests in DevTools
3. Verify Python backend is running
4. Test with mock data to isolate issues

Happy coding! 🚀
