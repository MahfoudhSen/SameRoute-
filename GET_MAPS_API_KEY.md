# How to Get Google Maps API Key

## Quick Method (5 minutes)

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create or Select a Project
1. Click on the project dropdown at the top
2. Click "New Project"
3. Name it "GreenRoute" (or any name)
4. Click "Create"

### Step 3: Enable Required APIs
1. In the search bar, type "Maps JavaScript API"
2. Click on it and click "Enable"
3. Repeat for:
   - **Places API**
   - **Geocoding API**
   - **Directions API**

### Step 4: Create API Key
1. Go to "Credentials" (left sidebar)
2. Click "+ CREATE CREDENTIALS"
3. Select "API key"
4. Copy your API key (it looks like: `AIzaSyC...`)

### Step 5: Add API Key to Your Files

Replace `YOUR_GOOGLE_MAPS_API_KEY` in these 3 files:

**1. Frontend/rider.html** (line 503)
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSy...YOUR_KEY...&libraries=places&callback=initMap" async defer></script>
```

**2. Frontend/driver.html** (line 578)
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSy...YOUR_KEY...&libraries=places&callback=initMap" async defer></script>
```

**3. Frontend/matches.html** (line 552)
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSy...YOUR_KEY...&libraries=places&callback=initMap" async defer></script>
```

## Alternative: Use the Test Page (No API Key Needed!)

While you're getting your API key, you can test the system immediately:

**Open:** http://localhost:8000/simple-test.html

This test page:
- ✅ No Google Maps API key required
- ✅ Uses preset NYC locations (dropdowns)
- ✅ Tests the full matching algorithm
- ✅ Shows all match results
- ✅ Perfect for demos and testing

## Testing the API Key

After adding your API key, test it:

1. Open: http://localhost:8000/rider.html
2. If the map loads → ✅ Success!
3. If you see a gray box → ❌ Check:
   - API key is correct
   - APIs are enabled
   - No typos in the script tag

## API Key Best Practices (Optional)

### Restrict Your API Key (Recommended for production)
1. In Google Cloud Console → Credentials
2. Click on your API key
3. Under "Application restrictions":
   - Select "HTTP referrers"
   - Add: `http://localhost:8000/*`
4. Under "API restrictions":
   - Select "Restrict key"
   - Choose only the 4 APIs you need

### Monitor Usage
- Free tier: $200/month credit
- After that: Pay per request
- Check usage: Google Cloud Console → Billing

## Troubleshooting

### "This page can't load Google Maps correctly"
- **Solution:** API key is invalid or APIs aren't enabled
- **Fix:** Double-check the key and enable all 4 APIs

### "RefererNotAllowedMapError"
- **Solution:** Your domain isn't allowed
- **Fix:** Add `http://localhost:8000/*` to HTTP referrers

### Maps show but search doesn't work
- **Solution:** Places API not enabled
- **Fix:** Enable "Places API" in Google Cloud Console

### Route lines don't show
- **Solution:** Directions API not enabled
- **Fix:** Enable "Directions API"

## Cost Information

**FREE TIER:**
- $200 credit per month
- Good for ~28,000 map loads
- Perfect for testing and demos

**What uses API calls:**
- Map load: $7 per 1,000 loads
- Place search: $17 per 1,000 searches
- Geocoding: $5 per 1,000 requests
- Directions: $5 per 1,000 requests

**For this project (testing):**
- You'll likely stay well within the free tier
- Set up billing alerts to be safe

## Summary

**Easiest path to test NOW:**
1. Use: http://localhost:8000/simple-test.html (no API key needed)

**To get full map features:**
1. Get API key from Google Cloud Console
2. Enable 4 APIs (Maps, Places, Geocoding, Directions)
3. Replace `YOUR_GOOGLE_MAPS_API_KEY` in 3 HTML files
4. Refresh your browser

---

**Questions?** Check the official docs:
https://developers.google.com/maps/documentation/javascript/get-api-key
