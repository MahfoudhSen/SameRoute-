# GreenRoute Matching System - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your Google Maps API Key

1. Visit: https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API
4. Create API Key (Credentials → Create Credentials → API Key)
5. Copy your API key

### Step 2: Update Frontend Files

Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key in these 3 files:

**File: Frontend/rider.html** (bottom of file)
**File: Frontend/driver.html** (bottom of file)
**File: Frontend/matches.html** (bottom of file)

Find this line:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places&callback=initMap" async defer></script>
```

Replace with:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIza...YOUR_KEY_HERE...&libraries=places&callback=initMap" async defer></script>
```

### Step 3: Start the Backend

```bash
cd Server
npm start
```

You should see:
```
✅ GreenRoute Server running on http://localhost:3000
📁 Data stored in: /Users/.../GreenRoute/Server/data
```

**Keep this terminal open!**

### Step 4: Start the Frontend

Open a **new terminal**:
```bash
cd Frontend
python3 -m http.server 8000
```

**Keep this terminal open too!**

### Step 5: Open the App

Open your browser and go to:
```
http://localhost:8000/matching.html
```

## 🎯 How to Use

### Test the Matching System:

1. **Register a Driver:**
   - Click "I Can Offer a Ride"
   - Name: `Alice Driver`
   - Phone: `+1-555-1234`
   - Click "Set Current Location" → Search "Empire State Building" or click on map
   - Click "Set Destination" → Search "Central Park" or click on map
   - Set max detour: `10 km`
   - Click "Find Matching Riders"

2. **Register a Rider:**
   - Open a **new tab**: http://localhost:8000/matching.html
   - Click "I Need a Ride"
   - Name: `Bob Rider`
   - Phone: `+1-555-5678`
   - Click "Set Current Location" → Search near Empire State Building
   - Click "Set Destination" → Search near Central Park
   - Click "Find Matching Drivers"

3. **View Matches:**
   - You should see Alice as a match for Bob!
   - Click "Contact" to call or WhatsApp

## 📁 Project Structure

```
GreenRoute/
├── Frontend/
│   ├── matching.html      # Main page - Start here!
│   ├── rider.html         # Rider registration
│   ├── driver.html        # Driver registration
│   └── matches.html       # Results page
└── Server/
    ├── server.js          # Backend API
    ├── package.json
    └── data/              # Auto-created
        ├── riders.txt     # All rider data
        └── drivers.txt    # All driver data
```

## 🔧 API Endpoints (for testing)

```bash
# Check server health
curl http://localhost:3000/api/health

# View all riders
curl http://localhost:3000/api/riders

# View all drivers
curl http://localhost:3000/api/drivers

# Clear all data
curl -X DELETE http://localhost:3000/api/clear
```

## 🌍 Pages Overview

| Page | URL | Purpose |
|------|-----|---------|
| **Main** | http://localhost:8000/matching.html | Choose rider or driver |
| **Rider** | http://localhost:8000/rider.html | Register as rider |
| **Driver** | http://localhost:8000/driver.html | Register as driver |
| **Matches** | http://localhost:8000/matches.html?type=rider&id=123 | View matches |

## ❗ Common Issues

### Maps not loading?
- Check you replaced `YOUR_GOOGLE_MAPS_API_KEY` with your actual key
- Open browser console (F12) and check for errors
- Verify APIs are enabled in Google Cloud Console

### "Failed to connect to server"?
- Make sure backend is running: `curl http://localhost:3000/api/health`
- Check terminal where you ran `npm start` for errors

### Port 3000 already in use?
- Edit `Server/server.js`, change `PORT = 3000` to `PORT = 3001`
- Update frontend files to use 3001
- Or kill the process: `lsof -ti:3000 | xargs kill`

### Frontend not loading?
- Make sure you're in Frontend directory: `cd Frontend`
- Try different port: `python3 -m http.server 8080`
- Then visit: `http://localhost:8080/matching.html`

## 🎨 Features

✅ **Interactive Maps** - Click to select locations
✅ **Place Search** - Find locations by name
✅ **Distance Calculation** - Haversine formula
✅ **Smart Matching** - Based on proximity
✅ **Match Scoring** - Percentage-based
✅ **Direct Contact** - Phone & WhatsApp
✅ **Text File Storage** - No database needed
✅ **Responsive Design** - Works on mobile

## 📊 How Matching Works

```
For a match to occur:

Total Detour = Distance(Driver Start → Rider Start)
             + Distance(Rider End → Driver End)

Match if: Total Detour ≤ Driver's Max Detour

Match Score = (Max Detour - Total Detour) / Max Detour × 100%
```

**Example:**
- Driver: Empire State → Central Park (max detour: 10km)
- Rider: Times Square → Columbus Circle
- Pickup distance: 2km
- Dropoff distance: 3km
- Total detour: 5km
- ✅ Match! (5km < 10km)
- Match score: 50%

## 🎓 Learning Points

This project demonstrates:
- RESTful API design with Express.js
- File-based data persistence
- Google Maps API integration
- Geolocation and distance calculations
- Frontend-backend communication
- Responsive web design
- Real-world algorithm implementation

## 📝 Data Format

**riders.txt** (one JSON per line):
```json
{"id":"1729289520000","name":"Bob Rider","phone":"+1-555-5678","currentLocation":{"address":"Times Square, NY","lat":40.7580,"lng":-73.9855},"destination":{"address":"Columbus Circle, NY","lat":40.7681,"lng":-73.9819},"timestamp":"2025-10-18T22:25:20.000Z"}
```

**drivers.txt** (one JSON per line):
```json
{"id":"1729289500000","name":"Alice Driver","phone":"+1-555-1234","currentLocation":{"address":"Empire State Building, NY","lat":40.7484,"lng":-73.9857},"destination":{"address":"Central Park, NY","lat":40.7829,"lng":-73.9654},"maxDetourKm":10,"timestamp":"2025-10-18T22:25:00.000Z"}
```

## 🔐 Important Notes

⚠️ **This is a demo/prototype:**
- Data is stored in plain text files
- No user authentication
- No data encryption
- No input sanitization for production
- API key is exposed in frontend (use restrictions in production)

**For production, you would need:**
- Database (PostgreSQL, MongoDB, etc.)
- User authentication (JWT, OAuth)
- Data validation and sanitization
- HTTPS/SSL
- Rate limiting
- Environment variables for secrets
- Backend API key proxy

## 🎉 Next Steps

1. Test with different locations
2. Try different detour distances
3. Register multiple riders and drivers
4. View the data files in `Server/data/`
5. Check the browser dev tools Network tab
6. Modify the matching algorithm
7. Add more features!

---

**Need help?** Check MATCHING_SETUP.md for detailed documentation.

**Built for demos and learning!** 🚗💚
