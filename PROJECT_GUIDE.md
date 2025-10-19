# 🚗 GreenRoute - Complete Project Guide

**A ride-sharing platform that connects nearby drivers and riders to reduce emissions and save money.**

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [User Flow](#user-flow)
4. [Backend API](#backend-api)
5. [Frontend Pages](#frontend-pages)
6. [Features](#features)
7. [Development](#development)

---

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
cd Server
npm install
node server.js
```

Server will run on: **http://localhost:3000**

### 2. Open the Frontend

Open in your browser:
```
file:///Users/mahfoudh/GreenRoute/Frontend/landing.html
```

### 3. User Journey

1. **Landing Page** → Click "Sign up"
2. **Sign Up** → Create account
3. **Login** → Enter credentials
4. **Map** → Start matching rides!

---

## 📁 Project Structure

```
GreenRoute/
│
├── Frontend/                    # All frontend files
│   ├── landing.html            # Main landing page ⭐ START HERE
│   ├── signup.html             # User registration
│   ├── login.html              # User authentication
│   ├── index.html              # Live matching map (main app)
│   ├── dashboard.html          # User dashboard
│   │
│   ├── driver.html             # Driver interface
│   ├── rider.html              # Rider interface
│   ├── matches.html            # Match results
│   │
│   ├── live-matching.html      # Google Maps version
│   ├── live-matching-free.html # OpenStreetMap (100% free)
│   │
│   ├── setup.html              # API key setup wizard
│   ├── test-api.html           # API testing tool
│   ├── simple-test.html        # Simple test version
│   │
│   ├── config.js               # Configuration
│   ├── styles.css              # Global styles
│   │
│   └── assets/                 # Images
│       ├── GreenRoute.png
│       ├── GreenRouteLogo.png
│       ├── logo2.png
│       └── Phone.png
│
├── Server/                      # Backend
│   ├── server.js               # Main backend server ⭐
│   ├── package.json            # Dependencies
│   │
│   ├── data/                   # Text file storage
│   │   ├── users.txt           # User accounts
│   │   ├── riders.txt          # Rider data
│   │   └── drivers.txt         # Driver data
│   │
│   └── node_modules/           # Dependencies (70 packages)
│
├── Documentation/               # All guides
│   ├── START_HERE.md           # Quick start guide
│   ├── QUICKSTART.md           # Fast setup
│   ├── README.md               # Main readme
│   ├── LIVE_TRACKING.md        # Live tracking guide
│   ├── MATCHING_SETUP.md       # Matching algorithm
│   ├── FINAL_SETUP.md          # Final setup
│   └── (other guides...)
│
└── PROJECT_GUIDE.md            # This file ⭐

```

---

## 🔄 User Flow

### Complete Journey:

```
┌─────────────────┐
│  landing.html   │  Landing Page
│  (Start Here)   │  - Beautiful homepage
└────────┬────────┘  - "Sign up" button
         │
         ↓
┌─────────────────┐
│  signup.html    │  Sign Up
│                 │  - Create account
└────────┬────────┘  - First name, last name
         │           - Username, email, password
         │
         ↓ After successful signup
         │
┌─────────────────┐
│  login.html     │  Login
│                 │  - Enter credentials
└────────┬────────┘  - Authenticate user
         │
         ↓ After successful login
         │
┌─────────────────┐
│  index.html     │  Live Matching Map
│  (Main App)     │  - Set start location
└─────────────────┘  - Set destination
                     - Find matches
                     - Live tracking
```

---

## 🔌 Backend API

**Base URL:** `http://localhost:3000`

### Authentication

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

### Riders

#### Register Rider
```http
POST /api/riders

{
  "name": "John Doe",
  "phone": "123-456-7890",
  "currentLocation": {
    "address": "123 Main St",
    "lat": 40.7128,
    "lng": -74.0060
  },
  "destination": {
    "address": "456 Broadway",
    "lat": 40.7589,
    "lng": -73.9851
  }
}
```

#### Get All Riders
```http
GET /api/riders
```

### Drivers

#### Register Driver
```http
POST /api/drivers

{
  "name": "Jane Smith",
  "phone": "098-765-4321",
  "currentLocation": {...},
  "destination": {...},
  "maxDetourKm": 5
}
```

#### Get All Drivers
```http
GET /api/drivers
```

### Matching

#### Find Matches
```http
GET /api/matches?type=rider&id=1234567890
GET /api/matches?type=driver&id=1234567890
```

### Live Tracking

#### Register Live Driver
```http
POST /api/live-driver

{
  "name": "Jane Smith",
  "phone": "098-765-4321",
  "location": {...},
  "destination": {...},
  "radiusKm": 10
}
```

#### Register Live Rider
```http
POST /api/live-rider
```

#### Update Location
```http
POST /api/update-location

{
  "id": "1234567890",
  "type": "driver",
  "lat": 40.7128,
  "lng": -74.0060
}
```

#### Find Live Matches
```http
GET /api/live-matches?type=driver&id=1234567890&radius=10
```

### Utilities

#### Health Check
```http
GET /api/health
```

#### Clear All Data
```http
DELETE /api/clear
```

---

## 🌐 Frontend Pages

### Main User Pages

#### 1. **landing.html** - Landing Page
- Beautiful marketing page
- "Sign up" and "Log in" buttons
- Feature showcase
- **Start here!**

#### 2. **signup.html** - User Registration
- Create new account
- First name, last name
- Username, email, password
- Redirects to login after success

#### 3. **login.html** - User Authentication
- Login with username/email
- Password authentication
- Redirects to map after success

#### 4. **index.html** - Live Matching Map ⭐
- Main application
- OpenStreetMap integration
- Set start and end locations
- Real-time matching
- Live location updates

#### 5. **dashboard.html** - User Dashboard
- User profile
- Trip history
- Settings

### Additional Pages

#### **driver.html** - Driver Interface
- Register as driver
- Set preferences
- View matches

#### **rider.html** - Rider Interface
- Request ride
- Set pickup/destination
- View available drivers

#### **matches.html** - Match Results
- View matched rides
- Distance calculations
- Match percentage

#### **live-matching.html** - Google Maps Version
- Uses Google Maps API
- Requires API key

#### **live-matching-free.html** - Free Version
- Uses OpenStreetMap
- 100% free, no API key needed
- Leaflet.js integration

### Setup & Testing

#### **setup.html** - Setup Wizard
- Step-by-step API key configuration
- Google Maps setup guide

#### **test-api.html** - API Testing
- Test Google Maps API
- Verify API key

#### **simple-test.html** - Simple Test
- No maps required
- Test matching algorithm
- Dropdown selection

---

## ✨ Features

### 🔐 Authentication
- ✅ User signup with validation
- ✅ Secure login
- ✅ Token-based authentication
- ✅ LocalStorage for session

### 🗺️ Mapping
- ✅ OpenStreetMap (free)
- ✅ Google Maps (optional)
- ✅ Click to set locations
- ✅ Visual route lines
- ✅ Distance circles

### 🚗 Ride Matching
- ✅ Haversine distance calculation
- ✅ Smart matching algorithm
- ✅ Detour preferences
- ✅ Real-time updates

### 📍 Live Tracking
- ✅ Real-time location updates (every 5 seconds)
- ✅ In-memory live user storage
- ✅ Automatic cleanup (5 minutes)
- ✅ Start + Destination support

### 💾 Data Storage
- ✅ Text file storage (demo-friendly)
- ✅ users.txt - User accounts
- ✅ riders.txt - Rider data
- ✅ drivers.txt - Driver data

---

## 🛠️ Development

### Prerequisites
- Node.js installed
- Web browser (Chrome, Firefox, Safari)

### Backend Setup

```bash
cd Server
npm install
node server.js
```

**Server runs on:** http://localhost:3000

### Frontend Setup

No build required! Just open HTML files in browser.

**Main entry point:**
```
file:///Users/mahfoudh/GreenRoute/Frontend/landing.html
```

### Dependencies

**Backend (package.json):**
- express ^5.1.0
- cors ^2.8.5
- body-parser ^2.2.0

**Frontend:**
- Leaflet.js (CDN) - For OpenStreetMap
- Google Maps API (optional) - For Google Maps version

### File Storage

Data is stored in text files:
- `/Server/data/users.txt`
- `/Server/data/riders.txt`
- `/Server/data/drivers.txt`

Each line is a JSON object.

---

## 🎯 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/signin` | Login |
| POST | `/api/riders` | Register rider |
| GET | `/api/riders` | Get all riders |
| POST | `/api/drivers` | Register driver |
| GET | `/api/drivers` | Get all drivers |
| GET | `/api/matches` | Find matches |
| POST | `/api/live-driver` | Register live driver |
| POST | `/api/live-rider` | Register live rider |
| POST | `/api/update-location` | Update location |
| GET | `/api/live-matches` | Find live matches |
| GET | `/api/live-drivers` | Get live drivers |
| GET | `/api/live-riders` | Get live riders |
| GET | `/api/health` | Health check |
| DELETE | `/api/clear` | Clear all data |

---

## 🚀 Quick Commands

### Start Server
```bash
cd /Users/mahfoudh/GreenRoute/Server
node server.js
```

### Open Frontend
```bash
open /Users/mahfoudh/GreenRoute/Frontend/landing.html
```

### Install Dependencies
```bash
cd /Users/mahfoudh/GreenRoute/Server
npm install
```

### Clear Data
```bash
> /Users/mahfoudh/GreenRoute/Server/data/users.txt
> /Users/mahfoudh/GreenRoute/Server/data/riders.txt
> /Users/mahfoudh/GreenRoute/Server/data/drivers.txt
```

---

## 📚 Documentation Files

- **START_HERE.md** - Quickest way to get started
- **QUICKSTART.md** - Fast setup guide
- **README.md** - General overview
- **LIVE_TRACKING.md** - Live tracking implementation
- **MATCHING_SETUP.md** - Matching algorithm details
- **FINAL_SETUP.md** - Complete setup guide
- **GET_API_KEY_NOW.md** - Google Maps API key
- **GET_CORRECT_API_KEY.md** - Correct API key type
- **GET_MAPS_API_KEY.md** - Maps API setup

---

## 🎨 Design

- **Font:** Fredoka (Google Fonts)
- **Colors:**
  - Primary Green: `#2f9e44`
  - Accent Lime: `#a3e635`
  - Background: `#3a6d47`
  - Dark Card: `#0f1411`
- **Style:** Modern, clean, pill-shaped buttons

---

## 💡 Tips

1. **First time setup:** Start with `landing.html`
2. **Testing:** Use `simple-test.html` for quick tests
3. **Maps:** Use `live-matching-free.html` for free version
4. **API Testing:** Use `test-api.html` to verify Google Maps
5. **Data:** Check `/Server/data/*.txt` files for stored data

---

## 📞 Support

If you encounter issues:
1. Check that server is running on port 3000
2. Verify data directory exists: `/Server/data/`
3. Check browser console for errors
4. Review `server.log` for backend errors

---

## ✅ Checklist

- [x] Backend server running
- [x] Frontend files accessible
- [x] User can signup
- [x] User can login
- [x] Map displays correctly
- [x] Matching algorithm works
- [x] Live tracking functional

---

**🚗 Happy Ride Sharing! 💚**

*GreenRoute - Share rides. Save money. Cut emissions.*
