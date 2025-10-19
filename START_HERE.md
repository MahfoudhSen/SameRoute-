# 🚗 GreenRoute Matching System - START HERE

## ✅ Current Status

**Backend:** ✅ Running on http://localhost:3000
**Frontend:** ✅ Running on http://localhost:8000

---

## 🎯 QUICK START (Test Right Now!)

### Option 1: Simple Test (No API Key Needed) ⭐ RECOMMENDED

**Open this URL in your browser:**
```
http://localhost:8000/simple-test.html
```

**What you can do:**
- ✅ Register drivers and riders
- ✅ Test the matching algorithm
- ✅ See real match results
- ✅ Use preset NYC locations
- ✅ NO Google Maps API key needed!

**How to test:**
1. Click "Register Driver & Find Riders" (uses default Alice at Empire State → Central Park)
2. Click "Register Rider & Find Drivers" (uses default Bob at Times Square → Columbus Circle)
3. See the matches appear below!
4. Try changing locations and detour distances

---

### Option 2: Full Version with Google Maps

**If you want the full map interface:**

1. **Get Google Maps API Key** (see GET_MAPS_API_KEY.md)
2. **Replace API key** in 3 files:
   - Frontend/rider.html
   - Frontend/driver.html
   - Frontend/matches.html
3. **Open:** http://localhost:8000/matching.html

---

## 📱 Available Pages

| Page | URL | Status | Description |
|------|-----|--------|-------------|
| **Simple Test** | http://localhost:8000/simple-test.html | ✅ Works now | No API key needed |
| **Matching Hub** | http://localhost:8000/matching.html | ⚠️ Needs API key | Choose rider/driver |
| **Rider Page** | http://localhost:8000/rider.html | ⚠️ Needs API key | Register as rider |
| **Driver Page** | http://localhost:8000/driver.html | ⚠️ Needs API key | Register as driver |
| **Matches** | http://localhost:8000/matches.html | ⚠️ Needs API key | View results |

---

## 🔧 Backend API

**Base URL:** http://localhost:3000

### Test the API:

```bash
# Health check
curl http://localhost:3000/api/health

# View all riders
curl http://localhost:3000/api/riders

# View all drivers
curl http://localhost:3000/api/drivers

# Clear all data
curl -X DELETE http://localhost:3000/api/clear
```

---

## 📊 How the Matching Works

### Algorithm:
```
1. Calculate pickup distance: Driver's start → Rider's start
2. Calculate dropoff distance: Rider's end → Driver's end
3. Total Detour = Pickup Distance + Dropoff Distance
4. Match if: Total Detour ≤ Driver's Maximum Detour
5. Score: (Max Detour - Total) / Max Detour × 100%
```

### Example Match:
```
Driver: Empire State Building → Central Park
        Max Detour: 10 km

Rider:  Times Square → Columbus Circle

Calculations:
- Pickup:  Empire State → Times Square = ~1.5 km
- Dropoff: Columbus Circle → Central Park = ~1.2 km
- Total:   1.5 + 1.2 = 2.7 km
- Result:  ✅ MATCH! (2.7 km < 10 km)
- Score:   73% match
```

---

## 🎨 Test Scenarios

### Scenario 1: Close Match ✅
```
Driver: Empire State → Central Park (10km detour)
Rider:  Times Square → Columbus Circle
Result: ✅ MATCH (~2.7km detour)
```

### Scenario 2: Too Far Apart ❌
```
Driver: Empire State → Central Park (5km detour)
Rider:  Brooklyn Bridge → Yankee Stadium
Result: ❌ NO MATCH (too far)
```

### Scenario 3: Exact Route ⭐
```
Driver: Times Square → Central Park (10km detour)
Rider:  Times Square → Central Park
Result: ✅ PERFECT MATCH (0km detour, 100% score)
```

---

## 📁 Project Files

### Frontend (Client-side)
```
Frontend/
├── simple-test.html      ⭐ Use this for testing!
├── matching.html         Choose rider/driver
├── rider.html           Rider registration with maps
├── driver.html          Driver registration with maps
└── matches.html         Results display with maps
```

### Backend (Server-side)
```
Server/
├── server.js           Express API server
├── package.json        Dependencies
└── data/
    ├── riders.txt      Rider data (JSON lines)
    └── drivers.txt     Driver data (JSON lines)
```

### Documentation
```
├── START_HERE.md           ⭐ This file
├── GET_MAPS_API_KEY.md     How to get Google Maps key
├── QUICKSTART.md           Quick setup guide
├── MATCHING_SETUP.md       Detailed technical docs
└── README.md               Original project overview
```

---

## 🐛 Troubleshooting

### "Can't connect to server"
**Problem:** Backend not running
**Fix:**
```bash
cd Server
node server.js &
```
**Test:** `curl http://localhost:3000/api/health`

---

### "Frontend page not loading"
**Problem:** Frontend server not running
**Fix:**
```bash
cd Frontend
python3 -m http.server 8000
```
**Test:** Open http://localhost:8000/simple-test.html

---

### "Maps not showing"
**Problem:** Missing Google Maps API key
**Solution 1 (Easy):** Use http://localhost:8000/simple-test.html
**Solution 2:** Get API key from GET_MAPS_API_KEY.md

---

### "No matches found"
**Reasons:**
1. ❌ Driver's max detour too small
2. ❌ Locations too far apart
3. ❌ No riders/drivers registered

**Fix:**
- Increase driver's detour distance
- Choose closer locations
- Register both a driver AND a rider

---

## 🎓 Understanding the Code

### Backend (server.js)
- Express.js REST API
- File-based storage (riders.txt, drivers.txt)
- Haversine distance formula
- Matching algorithm

### Frontend (simple-test.html)
- Pure HTML/CSS/JavaScript
- Fetch API for HTTP requests
- Dropdown location selection
- Real-time match display

### Full Frontend (rider.html, driver.html)
- Google Maps JavaScript API
- Interactive map controls
- Place search autocomplete
- Route visualization

---

## 📚 Learn More

**Haversine Formula:**
```javascript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
}
```

---

## 🎉 Next Steps

1. ✅ **Test the simple version:** http://localhost:8000/simple-test.html
2. ⭐ **Get Google Maps API key** (optional, see GET_MAPS_API_KEY.md)
3. 🚀 **Add more features** (ratings, real-time updates, etc.)
4. 📱 **Build a mobile app** (React Native, Flutter)
5. 🗄️ **Add a real database** (PostgreSQL, MongoDB)

---

## 💡 Tips

**For Demos:**
- Use simple-test.html - works instantly!
- Register driver first, then rider
- Use preset locations that are close together
- Try different detour distances

**For Development:**
- Check browser console (F12) for errors
- Monitor backend: `tail -f Server/server.log`
- View data files: `cat Server/data/*.txt`
- Clear data: `curl -X DELETE http://localhost:3000/api/clear`

---

## ✨ Features Summary

✅ **Smart Matching** - Distance-based algorithm
✅ **Proximity Filter** - Driver sets max detour
✅ **Match Scoring** - Percentage-based ranking
✅ **Direct Contact** - Phone/WhatsApp links
✅ **Text Storage** - No database setup needed
✅ **Two Modes** - Simple (no API) + Full (with maps)
✅ **Responsive** - Works on mobile and desktop

---

**Happy ride sharing! 🚗💚**

**Quick Links:**
- Test Now: http://localhost:8000/simple-test.html
- API Health: http://localhost:3000/api/health
- Get API Key: GET_MAPS_API_KEY.md
