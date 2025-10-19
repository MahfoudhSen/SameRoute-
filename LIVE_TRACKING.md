# 🚗 GreenRoute Live Tracking - Like Uber/Lyft!

## ✅ READY TO USE NOW!

**Open this URL:**
```
http://localhost:8000/live-matching.html
```

---

## 🎯 What You Get

### ✅ **Live Location Tracking**
- Your location updates every 5 seconds (like Uber/Lyft)
- Real-time driver movement visualization
- Automatic location detection via GPS

### ✅ **Visual Map Interface**
- **Full-screen Google Maps** - Interactive and beautiful
- **Click anywhere** to set your location
- **Search places** - Type any address or landmark
- **Live circles** - See your search radius visually

### ✅ **Smart Distance Matching**
- **Driver sets radius** - "I'll go up to 5km to pick up riders"
- **Visual circle on map** - See exactly how far you'll go
- **Real-time updates** - Matches appear as drivers/riders move
- **Sorted by distance** - Closest matches first

### ✅ **Uber/Lyft-like Experience**
- **Live tracking** - Watch markers move in real-time
- **Auto-cleanup** - Inactive users removed after 5 minutes
- **Instant matches** - See results within seconds
- **Distance display** - "2.3 km away"

---

## 🚀 How to Use

### As a Driver:

1. **Open:** http://localhost:8000/live-matching.html
2. **Click** "🚙 Driver" button (already selected)
3. **Enter** your name and phone
4. **Set Location:**
   - Click "📍 Use My Current Location" (easiest!)
   - OR click anywhere on the map
   - OR search for a place
5. **Adjust Radius:** Drag the slider (0.5 - 50 km)
   - See the green circle grow/shrink on the map!
   - This is how far you'll go to pick up riders
6. **Click** "🚙 Start Driving & Find Riders"
7. **Watch the magic!** 🎉
   - Your location marker appears (green with white border)
   - Green circle shows your search area
   - Blue markers appear for nearby riders
   - List shows rider names, phones, and distances
   - Updates every 5 seconds automatically

### As a Rider:

1. **Open:** http://localhost:8000/live-matching.html (in a new tab/window)
2. **Click** "🙋 Rider" button
3. **Enter** your name and phone
4. **Set Location:**
   - Click "📍 Use My Current Location"
   - OR click on the map
   - OR search
5. **Click** "🙋 Request Ride & Find Drivers"
6. **See matches:**
   - Nearby drivers appear as blue markers
   - Click markers for driver info
   - Click list items to center map on driver

---

## 🗺️ Map Features

### Your Marker (Green)
- **Large green circle** with white border
- **Your current location**
- Updates as you move

### Search Radius (Green Circle)
- **Dashed green circle** around you
- **Shows your range** for driver
- **Adjustable** with slider

### Match Markers (Blue)
- **Blue circles** with numbers
- **Click** to see details:
  - Name
  - Phone
  - Distance
- **Numbered** 1, 2, 3... (closest first)

---

## ⚡ Live Features

### Real-Time Location Updates
```
Every 5 seconds:
1. Your location sent to server
2. Server checks for matches within your radius
3. Map updates with new positions
4. Match list refreshes
```

### Auto-Cleanup
```
Every 5 minutes:
- Inactive users (no updates) are removed
- Keeps the map clean
- Saves server resources
```

### Distance Calculation
```
Uses Haversine formula:
- Accurate distance in km
- Straight-line distance
- Real-time calculations
```

---

## 🎨 How Matching Works

### Driver Perspective:
```
1. Driver sets radius: 5 km
2. Green circle shows 5km around driver
3. Any rider within 5km = MATCH
4. Riders sorted by distance (closest first)
```

### Rider Perspective:
```
1. Rider requests ride
2. Shows all drivers within THEIR radius
3. Example: Driver with 10km radius can see rider 8km away
4. Drivers sorted by distance
```

### Example Match:
```
Driver: Times Square (5 km radius)
Rider:  Empire State Building

Distance: 1.2 km
Result: ✅ MATCH! (1.2 < 5)

Driver sees: "Sam Rider - 1.2 km away"
Rider sees: "Alex Driver - 1.2 km away"
```

---

## 📱 Test Scenarios

### Scenario 1: Same Location
1. Open two browser windows
2. Window 1: Register as driver
3. Window 2: Register as rider
4. **Both use same location**
5. Result: **Perfect match! 0 km**

### Scenario 2: Moving Driver
1. Register as driver
2. Keep the page open
3. Walk/drive around with your phone
4. **Watch your marker move on the map!**
5. Matches update as you move

### Scenario 3: Multiple Users
1. Register 3 drivers at different locations
2. Register 1 rider
3. **Rider sees all 3 drivers** (sorted by distance)
4. **Each driver sees** rider if within their radius

---

## 🔧 Technical Details

### Backend API Endpoints:

```javascript
POST /api/live-driver
{
  "name": "Alex",
  "phone": "+1-555-1234",
  "location": { "address": "...", "lat": 40.7, "lng": -74.0 },
  "radiusKm": 5
}

POST /api/live-rider
{
  "name": "Sam",
  "phone": "+1-555-5678",
  "location": { "address": "...", "lat": 40.7, "lng": -74.0 }
}

POST /api/update-location
{
  "id": "123456",
  "type": "driver",
  "lat": 40.7128,
  "lng": -74.0060
}

GET /api/live-matches?type=driver&id=123&radius=5
Returns: { matches: [...], total: 3 }

GET /api/live-drivers
GET /api/live-riders
```

### Data Storage:
- **In-memory Map** - Lightning fast!
- **No database** - Perfect for testing
- **Auto-cleanup** - Stale data removed automatically
- **Persists** until server restart

---

## 🎯 Map Controls

### Zoom:
- **Scroll wheel** - Zoom in/out
- **+ / - buttons** - Top right corner
- **Pinch** - On mobile

### Pan:
- **Click and drag** - Move around
- **Double click** - Zoom in

### Set Location:
- **Single click** - Set your location
- **Search box** - Top left (type address)

### View Matches:
- **Click blue marker** - See info popup
- **Click list item** - Center map on match

---

## 💡 Pro Tips

1. **Use Real Location:**
   - Click "Use My Current Location"
   - Most accurate and easiest!

2. **Adjust Radius Visually:**
   - Drag slider and watch circle
   - Find the sweet spot for your needs

3. **Test with Multiple Tabs:**
   - Tab 1: Driver
   - Tab 2: Rider
   - See both perspectives!

4. **Watch Live Updates:**
   - Keep both tabs open
   - See real-time matching

5. **Simulate Movement:**
   - Click new location while "live"
   - Updates propagate automatically

---

## 🐛 Troubleshooting

### Map not showing?
**Issue:** Blank gray box
**Solution:** Google Maps API key is set! If you see errors:
1. Check browser console (F12)
2. The API key in the HTML should work for localhost
3. If limited, get your own from Google Cloud Console

### No matches?
**Reasons:**
- No other users registered
- Radius too small
- Users too far apart

**Fix:**
- Open two browser tabs
- Register driver in one, rider in other
- Use same or nearby locations

### Location not updating?
**Issue:** Marker stays in same place
**Solution:**
- Allow location access in browser
- Click new location manually
- Check that backend is running

### "Failed to connect to server"?
**Fix:**
```bash
curl http://localhost:3000/api/health
```
If error:
```bash
cd Server
node server.js &
```

---

## 🎓 How It Works (Technical)

### 1. Initial Registration
```javascript
// Driver clicks "Start Driving"
POST /api/live-driver
→ Server creates driver with ID
→ Stores in liveDrivers Map
→ Returns driver ID to frontend
```

### 2. Live Tracking Loop
```javascript
setInterval(async () => {
  // Every 5 seconds:

  // 1. Get current position
  navigator.geolocation.getCurrentPosition(...)

  // 2. Update server
  POST /api/update-location { id, lat, lng }

  // 3. Get matches
  GET /api/live-matches?type=driver&id=...

  // 4. Update map
  displayMatches(matches)

}, 5000)
```

### 3. Matching Algorithm
```javascript
// Server checks all riders
liveRiders.forEach(rider => {
  distance = calculateDistance(
    driver.lat, driver.lng,
    rider.lat, rider.lng
  )

  if (distance <= driver.radiusKm) {
    matches.push({ rider, distance })
  }
})

// Sort by distance
matches.sort((a, b) => a.distance - b.distance)
```

### 4. Map Visualization
```javascript
// Your marker (green)
new google.maps.Marker({
  position: yourLocation,
  icon: { fillColor: '#a3e635' }
})

// Search radius circle
new google.maps.Circle({
  center: yourLocation,
  radius: radiusKm * 1000,
  fillColor: '#a3e635',
  fillOpacity: 0.15
})

// Match markers (blue)
matches.forEach((match, i) => {
  new google.maps.Marker({
    position: match.location,
    icon: { fillColor: '#3b82f6' },
    label: (i + 1).toString()
  })
})
```

---

## 🚀 Next Steps

**Try it now:**
```
http://localhost:8000/live-matching.html
```

**Features:**
✅ Live GPS tracking
✅ Visual distance circles
✅ Real-time matching
✅ Click-to-set location
✅ Auto-cleanup
✅ Sorted results
✅ Full-screen map

**Just like Uber/Lyft!** 🎉

---

## 📊 Comparison

| Feature | GreenRoute | Uber/Lyft |
|---------|-----------|-----------|
| Live location | ✅ Every 5s | ✅ Every 3-5s |
| Visual map | ✅ Full screen | ✅ Full screen |
| Distance radius | ✅ Adjustable | ✅ Fixed |
| Auto-matching | ✅ Yes | ✅ Yes |
| Real-time updates | ✅ Yes | ✅ Yes |
| Click to set location | ✅ Yes | ❌ GPS only |
| In-memory storage | ✅ Yes | ❌ Database |

---

**Built with Google Maps API + Real-time tracking!** 🗺️🚗💚
