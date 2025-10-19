# 🗺️ Get Your Google Maps API Key - RIGHT NOW!

## ⚡ FASTEST PATH (5 Minutes)

### Step 1: Open Google Cloud Console (1 minute)

**Click this link:**
👉 https://console.cloud.google.com/

1. Sign in with your Google account (Gmail)
2. Accept terms if prompted

---

### Step 2: Create Project (30 seconds)

1. Click the **project dropdown** at the very top (says "Select a project")
2. Click **"NEW PROJECT"** button
3. Project name: `GreenRoute`
4. Click **"CREATE"**
5. Wait 10 seconds for it to be created
6. Click **"SELECT PROJECT"** when it appears

---

### Step 3: Enable APIs (2 minutes)

**Enable these 3 APIs (do each separately):**

#### API #1: Maps JavaScript API
1. In the search bar at top, type: `Maps JavaScript API`
2. Click on **"Maps JavaScript API"**
3. Click the blue **"ENABLE"** button
4. Wait for it to enable (10 seconds)

#### API #2: Places API
1. Click back arrow or search again
2. Search: `Places API`
3. Click on **"Places API"**
4. Click **"ENABLE"**
5. Wait 10 seconds

#### API #3: Geocoding API
1. Click back arrow or search again
2. Search: `Geocoding API`
3. Click on **"Geocoding API"**
4. Click **"ENABLE"**
5. Wait 10 seconds

---

### Step 4: Create API Key (1 minute)

1. In the left sidebar, click **"Credentials"** (has a key icon)
2. At the top, click **"+ CREATE CREDENTIALS"**
3. Select **"API key"**
4. A popup appears with your API key!
5. **COPY the key** (it starts with `AIza...`)

Your API key looks like:
```
AIzaSyC4XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX
```

---

### Step 5: Add API Key to Your Project (30 seconds)

**Option A: Use the Setup Page**
1. Open: http://localhost:8000/setup.html
2. Paste your API key in the input box
3. Click "Save API Key"
4. Done!

**Option B: Manual (Advanced)**
1. Open a terminal
2. Run this command (replace YOUR_KEY with your actual key):
```bash
echo "localStorage.setItem('googleMapsApiKey', 'YOUR_API_KEY_HERE');" | pbcopy
```
3. Open: http://localhost:8000/live-matching.html
4. Press F12 (open console)
5. Paste the command and press Enter
6. Refresh the page

---

### Step 6: Test It! (10 seconds)

Open in your browser:
```
http://localhost:8000/live-matching.html
```

You should see:
✅ Full-screen Google Maps loaded
✅ Your location marker
✅ Working controls

---

## 🎯 Quick Command Version

If you want me to do this for you, just:

1. **Get your API key** from Google (steps 1-4 above)
2. **Tell me the key** (starts with `AIza...`)
3. I'll configure everything instantly!

---

## 💰 Pricing

**FREE:**
- $200 credit per month
- Good for ~28,000 map loads
- Perfect for testing/development

**You won't be charged** unless you exceed the free tier.

---

## 🔒 Security (Optional but Recommended)

After getting your key, restrict it:

1. In Google Cloud Console → Credentials
2. Click on your API key
3. Under "Application restrictions":
   - Select **"HTTP referrers"**
   - Add: `http://localhost:8000/*`
   - Add: `http://localhost:*/*`
4. Under "API restrictions":
   - Select **"Restrict key"**
   - Select only: Maps JavaScript API, Places API, Geocoding API
5. Click **"SAVE"**

This prevents others from using your key!

---

## ⚡ DONE!

Once you have the API key:

```
http://localhost:8000/live-matching.html
```

Will show:
- ✅ Full Google Maps
- ✅ Click anywhere to set location
- ✅ Visual distance circles
- ✅ Live GPS tracking
- ✅ Search any place
- ✅ Real-time matching

**Like Uber/Lyft!** 🚗💚
