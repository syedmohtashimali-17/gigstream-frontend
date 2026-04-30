# 🎯 GigStream - ONE-PAGE CHEAT SHEET

## THIS IS ALL YOU NEED TO KNOW

### 🟢 What Works Right Now
- Frontend running at `http://localhost:5173/` ✅
- Mock jobs display ✅
- Search works ✅
- Filters work ✅
- Loading/error states work ✅

### 🔴 What You Need to Do
One change. That's it.

---

## THE ONLY CHANGE REQUIRED

**File:** `src/App.jsx` - **Line 27**

```javascript
// ❌ BEFORE (line 27):
const response = await axios.get('http://localhost:8000/api/jobs', {

// ✅ AFTER (change to YOUR backend):
const response = await axios.get('http://your-backend-url/api/jobs', {
```

**Examples:**
- Local: `http://localhost:8000/api/jobs`
- Production: `https://api.yourdomain.com/api/jobs`
- Docker: `http://backend:8000/api/jobs`

---

## YOUR API SHOULD RETURN

```json
[
  {
    "id": 1,
    "title": "Job Title",
    "description": "Job description...",
    "skills": ["React", "JavaScript"],
    "budget": "1500-2500",
    "platform": "Upwork",
    "company": "Company Name",
    "level": "Intermediate"
  }
]
```

**Required Fields:** id, title, description, skills, budget, platform, company, level

---

## QUICK PYTHON BACKEND

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"])

@app.get("/api/jobs")
async def get_jobs():
    return [  # Your jobs from database
        {
            "id": 1,
            "title": "React Dashboard",
            "description": "Build dashboard...",
            "skills": ["React"],
            "budget": "1500-2500",
            "platform": "Upwork",
            "company": "ABC",
            "level": "Intermediate"
        }
    ]
```

Run: `uvicorn main:app --reload --port 8000`

---

## VERIFY IT WORKS

1. **Backend running?**
   ```bash
   curl http://localhost:8000/api/jobs
   # Should return JSON array
   ```

2. **Updated App.jsx line 27?** ✅

3. **Reload http://localhost:5173/** ✅

4. **Jobs show up?** ✅ DONE!

---

## FILE LOCATIONS

| File | Purpose |
|------|---------|
| `src/App.jsx` | **Main (line 27 ← change here)** |
| `src/components/JobCard.jsx` | Job display |
| `src/components/Navbar.jsx` | Search bar |
| `src/components/Sidebar.jsx` | Filters |
| `src/index.css` | Tailwind styles |

---

## CUSTOMIZATION (Optional)

### Change Primary Color (Blue → Green)
Find and replace in all component files:
- `blue-600` → `green-600`
- `blue-100` → `green-100`
- `blue-200` → `green-200`

### Add/Remove Skills
`src/components/Sidebar.jsx` line 26:
```javascript
const availableSkills = [
  'React', 'Vue.js', 'Angular',
  // Add/remove here
];
```

### Change Budget Limit (10000 → 50000)
`src/App.jsx` line 19:
```javascript
const [budgetRange, setBudgetRange] = useState([0, 50000]);
```

AND `src/components/Sidebar.jsx` line 78:
```html
<input max="50000" />
```

---

## MOCK DATA

If backend offline, app uses 6 mock jobs automatically:
- React Dashboard ($1500-2500)
- MERN Payment ($2000-3000)
- WordPress ($500-1000)
- Vue Library ($3000-5000)
- TypeScript API ($2500-4000)
- React Native ($4000-6000)

Great for testing before backend ready! ✅

---

## ERRORS & FIXES

| Error | Fix |
|-------|-----|
| CORS error | Add `allow_origins` to FastAPI CORS middleware |
| 404 jobs | Check API URL in line 27 of App.jsx |
| Empty jobs | Verify backend returns jobs array |
| Filters not working | Check data: skills=array, budget=string |
| No API calls made | Check network tab in DevTools (F12) |

---

## DEVELOPMENT COMMANDS

```bash
# Start frontend
npm run dev                    # http://localhost:5173

# Build for production
npm run build

# Start backend
python -m uvicorn main:app --reload --port 8000
```

---

## TECH STACK

- React 19 - UI
- Tailwind 4 - Styling
- Axios - HTTP
- Lucide - Icons
- Vite - Build tool

All installed! ✅

---

## THAT'S IT!

1. Update line 27 in `src/App.jsx` ✅
2. Start Python backend ✅
3. Reload http://localhost:5173/ ✅
4. Done! 🎉

Full docs in:
- [QUICKSTART.md](QUICKSTART.md) - Detailed quick start
- [API_INTEGRATION.md](API_INTEGRATION.md) - API reference
- [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) - Complete guide

---

**Status:** ✨ Production Ready - Waiting for Backend ✨
