# GreenRoute Matching System - Setup Guide

## Overview
A real-time ride-sharing matching system that connects riders and drivers based on their routes and proximity preferences. Uses Google Maps for location selection and stores data in local text files.

## Features
- ✅ Interactive Google Maps integration
- ✅ Real-time distance calculations using Haversine formula
- ✅ Driver proximity preferences (maximum detour distance)
- ✅ Match percentage scoring
- ✅ Text file-based storage (no database needed)
- ✅ Direct contact via phone/WhatsApp
- ✅ Responsive design

## Project Structure
```
GreenRoute/
├── Frontend/
│   ├── matching.html      # Main navigation page
│   ├── rider.html         # Rider registration
│   ├── driver.html        # Driver registration
│   └── matches.html       # Match results display
└── Server/
    ├── server.js          # Express backend
    ├── package.json       # Dependencies
    └── data/              # Auto-created
        ├── riders.txt     # Rider data (JSON lines)
        └── drivers.txt    # Driver data (JSON lines)
```

## Prerequisites
1. **Node.js** (v14 or higher)
2. **Google Maps API Key** with the following APIs enabled:
   - Maps JavaScript API
   - Places API
   - Geocoding API

## Setup Instructions

### Step 1: Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API
4. Create credentials (API Key)
5. Copy your API key

### Step 2: Configure Frontend
Replace `YOUR_GOOGLE_MAPS_API_KEY` in these files:
- `Frontend/rider.html` (line at bottom)
- `Frontend/driver.html` (line at bottom)
- `Frontend/matches.html` (line at bottom)

Find this line in each file:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places&callback=initMap" async defer></script>
```

Replace with:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY_HERE&libraries=places&callback=initMap" async defer></script>
```

### Step 3: Install Backend Dependencies
```bash
cd Server
npm install
```

This installs:
- express
- cors
- body-parser

### Step 4: Start the Backend Server
```bash
npm start
```

You should see:
```
✅ GreenRoute Server running on http://localhost:5000
📁 Data stored in: /path/to/GreenRoute/Server/data
```

### Step 5: Start the Frontend Server
In a new terminal:
```bash
cd Frontend
python3 -m http.server 8000
```

Or use any other static file server.

### Step 6: Access the Application
Open your browser and navigate to:
```
http://localhost:8000/matching.html
```

## How to Use

### As a Rider:
1. Click "I Need a Ride"
2. Enter your name and phone number
3. Click "Set Current Location" and select on map
4. Click "Set Destination" and select on map
5. Click "Find Matching Drivers"
6. View matches sorted by proximity
7. Contact drivers directly

### As a Driver:
1. Click "I Can Offer a Ride"
2. Enter your name and phone number
3. Click "Set Current Location" and select on map
4. Click "Set Destination" and select on map
5. Set maximum detour distance (1-50 km)
6. Click "Find Matching Riders"
7. View matches sorted by proximity
8. Contact riders directly

## API Endpoints

### POST /api/riders
Register a new rider
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "currentLocation": {
    "address": "123 Main St",
    "lat": 40.7128,
    "lng": -74.0060
  },
  "destination": {
    "address": "456 Park Ave",
    "lat": 40.7589,
    "lng": -73.9851
  }
}
```

### POST /api/drivers
Register a new driver
```json
{
  "name": "Jane Smith",
  "phone": "+1987654321",
  "currentLocation": {
    "address": "789 Broadway",
    "lat": 40.7200,
    "lng": -74.0100
  },
  "destination": {
    "address": "321 5th Ave",
    "lat": 40.7500,
    "lng": -73.9800
  },
  "maxDetourKm": 10
}
```

### GET /api/matches
Find matches for a user
```
GET /api/matches?type=rider&id=1234567890
GET /api/matches?type=driver&id=0987654321
```

### GET /api/riders
Get all registered riders

### GET /api/drivers
Get all registered drivers

### DELETE /api/clear
Clear all data (for testing)

## Matching Algorithm

The system uses the Haversine formula to calculate distances:

```
Total Detour = Pickup Distance + Drop-off Distance

Where:
- Pickup Distance = Distance from driver's current location to rider's current location
- Drop-off Distance = Distance from rider's destination to driver's destination

A match is valid if: Total Detour ≤ Driver's Maximum Detour
```

Match percentage is calculated as:
```
Match % = max(0, ((Max Detour - Total Detour) / Max Detour) × 100)
```

## Data Storage

Data is stored in plain text files with one JSON object per line:

**riders.txt:**
```json
{"id":"1234567890","name":"John Doe","phone":"+1234567890","currentLocation":{"address":"...","lat":40.7128,"lng":-74.0060},"destination":{"address":"...","lat":40.7589,"lng":-73.9851},"timestamp":"2025-01-15T10:30:00.000Z"}
```

**drivers.txt:**
```json
{"id":"0987654321","name":"Jane Smith","phone":"+1987654321","currentLocation":{"address":"...","lat":40.7200,"lng":-74.0100},"destination":{"address":"...","lat":40.7500,"lng":-73.9800},"maxDetourKm":10,"timestamp":"2025-01-15T11:00:00.000Z"}
```

## Testing

### Test the Backend API:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all riders
curl http://localhost:5000/api/riders

# Get all drivers
curl http://localhost:5000/api/drivers

# Clear all data
curl -X DELETE http://localhost:5000/api/clear
```

### Test the Matching System:
1. Register a driver with a route
2. Register a rider with a similar route
3. Check matches for both users
4. Verify match scores and distances

## Troubleshooting

### Maps not loading:
- Check API key is correctly set
- Verify APIs are enabled in Google Cloud Console
- Check browser console for errors

### Backend connection errors:
- Ensure backend is running on port 5000
- Check CORS settings
- Verify fetch URLs use correct port

### No matches found:
- Try increasing driver's maximum detour distance
- Check if rider and driver routes are actually close
- Verify locations are correctly set

## Future Enhancements
- Real-time updates using WebSockets
- User authentication
- Trip history
- Rating system
- Payment integration
- Mobile app

## License
Educational/Demo purposes

---
**Built with ❤️ for GreenRoute**
