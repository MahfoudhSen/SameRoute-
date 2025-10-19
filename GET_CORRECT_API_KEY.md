# ⚠️ You Have a Service Account - You Need an API Key!

## What You Have
You created a **Service Account** (for server-to-server authentication)

## What You Need
You need a **Browser API Key** (for Google Maps in web browsers)

---

## 🔑 Get the Correct API Key (2 Minutes)

You already have a project (`greenroute-475523`), so this is quick!

### Step 1: Go to Credentials
👉 https://console.cloud.google.com/apis/credentials?project=greenroute-475523

### Step 2: Create API Key
1. Click **"+ CREATE CREDENTIALS"** at the top
2. Select **"API key"** (NOT Service account!)
3. A popup appears with your key
4. **Copy it** - looks like: `AIzaSyC...`

### Step 3: Enable Required APIs
👉 https://console.cloud.google.com/apis/library?project=greenroute-475523

Search and enable each:
1. **Maps JavaScript API** - Click Enable
2. **Places API** - Click Enable
3. **Geocoding API** - Click Enable

### Step 4: Configure Your API Key

**Paste your API key here:**
```
http://localhost:8000/setup.html
```

---

## ✅ Quick Command

Once you have your API key (starts with `AIza...`), run:

```bash
cd /Users/mahfoudh/GreenRoute
./configure-api-key.sh AIzaSyYOUR_KEY_HERE
```

Then open:
```
http://localhost:8000/set-api-key.html
```

---

## 🎯 Direct Links for Your Project

**Create API Key:**
https://console.cloud.google.com/apis/credentials/wizard?api=maps-backend.googleapis.com&project=greenroute-475523

**Enable Maps JavaScript API:**
https://console.cloud.google.com/apis/library/maps-backend.googleapis.com?project=greenroute-475523

**Enable Places API:**
https://console.cloud.google.com/apis/library/places-backend.googleapis.com?project=greenroute-475523

**Enable Geocoding API:**
https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?project=greenroute-475523

---

## 📋 The Difference

### Service Account (What you have):
```json
{
  "type": "service_account",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  ...
}
```
- ❌ For server-side applications
- ❌ Doesn't work in browsers
- ❌ Not what we need

### API Key (What you need):
```
AIzaSyC4XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX
```
- ✅ For browser applications
- ✅ Works with Google Maps JavaScript API
- ✅ What we need!

---

## 🚀 Once You Have the API Key

**Method 1: Web Setup (Easiest)**
```
http://localhost:8000/setup.html
```
Paste key → Save → Done!

**Method 2: Script**
```bash
./configure-api-key.sh YOUR_API_KEY
```

**Method 3: Manual**
Open browser console (F12) at:
```
http://localhost:8000/live-matching.html
```

Paste:
```javascript
localStorage.setItem('googleMapsApiKey', 'YOUR_API_KEY_HERE');
```

Refresh page!

---

## ✅ After Setup

Open:
```
http://localhost:8000/live-matching.html
```

You'll see:
- ✅ Full Google Maps
- ✅ Your location
- ✅ Everything working!

---

**Get your API key now:** https://console.cloud.google.com/apis/credentials?project=greenroute-475523
