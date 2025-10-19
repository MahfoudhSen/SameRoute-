const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware - Allow all origins including file://
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
app.use(bodyParser.json());

// File paths
const RIDERS_FILE = path.join(__dirname, 'data', 'riders.txt');
const DRIVERS_FILE = path.join(__dirname, 'data', 'drivers.txt');
const USERS_FILE = path.join(__dirname, 'data', 'users.txt');

// Ensure data directory exists
async function initDataDirectory() {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.mkdir(dataDir, { recursive: true });
    // Initialize files if they don't exist
    try {
      await fs.access(RIDERS_FILE);
    } catch {
      await fs.writeFile(RIDERS_FILE, '');
    }
    try {
      await fs.access(DRIVERS_FILE);
    } catch {
      await fs.writeFile(DRIVERS_FILE, '');
    }
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, '');
    }
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Calculate distance between two coordinates using Haversine formula (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Read data from file
async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    if (!data.trim()) return [];
    return data.trim().split('\n').map(line => JSON.parse(line));
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}

// Write data to file
async function appendData(filePath, data) {
  try {
    const line = JSON.stringify(data) + '\n';
    await fs.appendFile(filePath, line);
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false;
  }
}

// Update data in file
async function updateData(filePath, data) {
  try {
    const lines = data.map(item => JSON.stringify(item)).join('\n') + '\n';
    await fs.writeFile(filePath, lines);
    return true;
  } catch (error) {
    console.error('Error updating file:', error);
    return false;
  }
}

// ============ AUTHENTICATION ENDPOINTS ============

// POST endpoint - User signup
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const users = await readData(USERS_FILE);

    // Check if user already exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const user = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, this should be hashed
      firstName: firstName || '',
      lastName: lastName || '',
      createdAt: new Date().toISOString()
    };

    const success = await appendData(USERS_FILE, user);

    if (success) {
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json({
        message: 'User registered successfully',
        user: userWithoutPassword,
        token: `token_${user.id}` // Simple token for demo
      });
    } else {
      res.status(500).json({ error: 'Failed to register user' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// POST endpoint - User signin
app.post('/api/auth/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const users = await readData(USERS_FILE);

    // Find user by username or email
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      ...userWithoutPassword,
      token: `token_${user.id}` // Simple token for demo
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

// ============ RIDER & DRIVER ENDPOINTS ============

// POST endpoint - Register a rider
app.post('/api/riders', async (req, res) => {
  const { name, phone, currentLocation, destination } = req.body;

  if (!name || !phone || !currentLocation || !destination) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const rider = {
    id: Date.now().toString(),
    name,
    phone,
    currentLocation: {
      address: currentLocation.address,
      lat: currentLocation.lat,
      lng: currentLocation.lng
    },
    destination: {
      address: destination.address,
      lat: destination.lat,
      lng: destination.lng
    },
    timestamp: new Date().toISOString()
  };

  const success = await appendData(RIDERS_FILE, rider);

  if (success) {
    res.json({ message: 'Rider registered successfully', rider });
  } else {
    res.status(500).json({ error: 'Failed to register rider' });
  }
});

// POST endpoint - Register a driver
app.post('/api/drivers', async (req, res) => {
  const { name, phone, currentLocation, destination, maxDetourKm } = req.body;

  if (!name || !phone || !currentLocation || !destination || !maxDetourKm) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const driver = {
    id: Date.now().toString(),
    name,
    phone,
    currentLocation: {
      address: currentLocation.address,
      lat: currentLocation.lat,
      lng: currentLocation.lng
    },
    destination: {
      address: destination.address,
      lat: destination.lat,
      lng: destination.lng
    },
    maxDetourKm: parseFloat(maxDetourKm),
    timestamp: new Date().toISOString()
  };

  const success = await appendData(DRIVERS_FILE, driver);

  if (success) {
    res.json({ message: 'Driver registered successfully', driver });
  } else {
    res.status(500).json({ error: 'Failed to register driver' });
  }
});

// GET endpoint - Find matches
app.get('/api/matches', async (req, res) => {
  const { type, id } = req.query;

  if (!type || !id) {
    return res.status(400).json({ error: 'Missing type or id parameter' });
  }

  try {
    const riders = await readData(RIDERS_FILE);
    const drivers = await readData(DRIVERS_FILE);

    let matches = [];

    if (type === 'rider') {
      // Find a rider and match with drivers
      const rider = riders.find(r => r.id === id);
      if (!rider) {
        return res.status(404).json({ error: 'Rider not found' });
      }

      matches = drivers.map(driver => {
        // Calculate distance from driver's current location to rider's current location
        const pickupDistance = calculateDistance(
          driver.currentLocation.lat,
          driver.currentLocation.lng,
          rider.currentLocation.lat,
          rider.currentLocation.lng
        );

        // Calculate distance from rider's destination to driver's destination
        const dropoffDistance = calculateDistance(
          rider.destination.lat,
          rider.destination.lng,
          driver.destination.lat,
          driver.destination.lng
        );

        const totalDetour = pickupDistance + dropoffDistance;
        const isMatch = totalDetour <= driver.maxDetourKm;

        return {
          driver,
          pickupDistance: pickupDistance.toFixed(2),
          dropoffDistance: dropoffDistance.toFixed(2),
          totalDetour: totalDetour.toFixed(2),
          isMatch,
          matchPercentage: Math.max(0, ((driver.maxDetourKm - totalDetour) / driver.maxDetourKm * 100)).toFixed(0)
        };
      }).filter(m => m.isMatch).sort((a, b) => a.totalDetour - b.totalDetour);

    } else if (type === 'driver') {
      // Find a driver and match with riders
      const driver = drivers.find(d => d.id === id);
      if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
      }

      matches = riders.map(rider => {
        // Calculate distance from driver's current location to rider's current location
        const pickupDistance = calculateDistance(
          driver.currentLocation.lat,
          driver.currentLocation.lng,
          rider.currentLocation.lat,
          rider.currentLocation.lng
        );

        // Calculate distance from rider's destination to driver's destination
        const dropoffDistance = calculateDistance(
          rider.destination.lat,
          rider.destination.lng,
          driver.destination.lat,
          driver.destination.lng
        );

        const totalDetour = pickupDistance + dropoffDistance;
        const isMatch = totalDetour <= driver.maxDetourKm;

        return {
          rider,
          pickupDistance: pickupDistance.toFixed(2),
          dropoffDistance: dropoffDistance.toFixed(2),
          totalDetour: totalDetour.toFixed(2),
          isMatch,
          matchPercentage: Math.max(0, ((driver.maxDetourKm - totalDetour) / driver.maxDetourKm * 100)).toFixed(0)
        };
      }).filter(m => m.isMatch).sort((a, b) => a.totalDetour - b.totalDetour);
    }

    res.json({ matches, total: matches.length });
  } catch (error) {
    console.error('Error finding matches:', error);
    res.status(500).json({ error: 'Failed to find matches' });
  }
});

// GET endpoint - Get all riders
app.get('/api/riders', async (req, res) => {
  const riders = await readData(RIDERS_FILE);
  res.json({ riders, total: riders.length });
});

// GET endpoint - Get all drivers
app.get('/api/drivers', async (req, res) => {
  const drivers = await readData(DRIVERS_FILE);
  res.json({ drivers, total: drivers.length });
});

// DELETE endpoint - Clear all data (for testing)
app.delete('/api/clear', async (req, res) => {
  try {
    await fs.writeFile(RIDERS_FILE, '');
    await fs.writeFile(DRIVERS_FILE, '');
    res.json({ message: 'All data cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear data' });
  }
});

// Live tracking - In-memory storage for active users
const liveDrivers = new Map(); // id -> {name, phone, location, radiusKm, lastUpdate}
const liveRiders = new Map(); // id -> {name, phone, location, lastUpdate}
const rideRequests = new Map(); // requestId -> {driverId, riderId, status, timestamp}

// POST endpoint - Register live driver
app.post('/api/live-driver', (req, res) => {
  const { name, phone, location, destination, radiusKm } = req.body;

  if (!name || !phone || !location || !radiusKm) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const driver = {
    id: Date.now().toString(),
    name,
    phone,
    location: {
      address: location.address,
      lat: location.lat,
      lng: location.lng
    },
    destination: destination ? {
      address: destination.address,
      lat: destination.lat,
      lng: destination.lng
    } : null,
    radiusKm: parseFloat(radiusKm),
    lastUpdate: new Date().toISOString()
  };

  liveDrivers.set(driver.id, driver);

  res.json({ message: 'Driver registered', driver });
});

// POST endpoint - Register live rider
app.post('/api/live-rider', (req, res) => {
  const { name, phone, location, destination } = req.body;

  if (!name || !phone || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const rider = {
    id: Date.now().toString(),
    name,
    phone,
    location: {
      address: location.address,
      lat: location.lat,
      lng: location.lng
    },
    destination: destination ? {
      address: destination.address,
      lat: destination.lat,
      lng: destination.lng
    } : null,
    lastUpdate: new Date().toISOString()
  };

  liveRiders.set(rider.id, rider);

  res.json({ message: 'Rider registered', rider });
});

// POST endpoint - Update location
app.post('/api/update-location', (req, res) => {
  const { id, type, lat, lng } = req.body;

  if (!id || !type || lat === undefined || lng === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const collection = type === 'driver' ? liveDrivers : liveRiders;
  const user = collection.get(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.location.lat = lat;
  user.location.lng = lng;
  user.lastUpdate = new Date().toISOString();

  collection.set(id, user);

  res.json({ message: 'Location updated', location: { lat, lng } });
});

// GET endpoint - Find live matches
app.get('/api/live-matches', (req, res) => {
  const { type, id, radius } = req.query;

  if (!type || !id) {
    return res.status(400).json({ error: 'Missing type or id parameter' });
  }

  const radiusKm = parseFloat(radius) || 10;
  let matches = [];

  try {
    if (type === 'driver') {
      const driver = liveDrivers.get(id);
      if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
      }

      // Find riders within radius
      matches = Array.from(liveRiders.values()).map(rider => {
        const distance = calculateDistance(
          driver.location.lat,
          driver.location.lng,
          rider.location.lat,
          rider.location.lng
        );

        return {
          rider,
          distance: distance.toFixed(2),
          isMatch: distance <= radiusKm
        };
      }).filter(m => m.isMatch).sort((a, b) => a.distance - b.distance);

    } else if (type === 'rider') {
      const rider = liveRiders.get(id);
      if (!rider) {
        return res.status(404).json({ error: 'Rider not found' });
      }

      // Find drivers within their radius
      matches = Array.from(liveDrivers.values()).map(driver => {
        const distance = calculateDistance(
          rider.location.lat,
          rider.location.lng,
          driver.location.lat,
          driver.location.lng
        );

        return {
          driver,
          distance: distance.toFixed(2),
          isMatch: distance <= driver.radiusKm
        };
      }).filter(m => m.isMatch).sort((a, b) => a.distance - b.distance);
    }

    res.json({ matches, total: matches.length });
  } catch (error) {
    console.error('Error finding matches:', error);
    res.status(500).json({ error: 'Failed to find matches' });
  }
});

// GET endpoint - Get all live drivers
app.get('/api/live-drivers', (req, res) => {
  const drivers = Array.from(liveDrivers.values());
  res.json({ drivers, total: drivers.length });
});

// GET endpoint - Get all live riders
app.get('/api/live-riders', (req, res) => {
  const riders = Array.from(liveRiders.values());
  res.json({ riders, total: riders.length });
});

// ============ RIDE REQUEST ENDPOINTS ============

// POST endpoint - Send ride request (bidirectional: driver→rider or rider→driver)
app.post('/api/ride-request', (req, res) => {
  const { senderId, receiverId, senderType } = req.body; // senderType: 'driver' or 'rider'

  if (!senderId || !receiverId || !senderType) {
    return res.status(400).json({ error: 'Missing senderId, receiverId, or senderType' });
  }

  let sender, receiver, driverId, riderId;

  if (senderType === 'driver') {
    sender = liveDrivers.get(senderId);
    receiver = liveRiders.get(receiverId);
    driverId = senderId;
    riderId = receiverId;
  } else {
    sender = liveRiders.get(senderId);
    receiver = liveDrivers.get(receiverId);
    riderId = senderId;
    driverId = receiverId;
  }

  if (!sender) {
    return res.status(404).json({ error: `${senderType} not found` });
  }

  if (!receiver) {
    return res.status(404).json({ error: `${senderType === 'driver' ? 'Rider' : 'Driver'} not found` });
  }

  const requestId = `req_${Date.now()}`;
  const request = {
    id: requestId,
    driverId,
    riderId,
    senderId,
    senderType,
    driverName: senderType === 'driver' ? sender.name : receiver.name,
    driverPhone: senderType === 'driver' ? sender.phone : receiver.phone,
    driverLocation: senderType === 'driver' ? sender.location : receiver.location,
    riderName: senderType === 'rider' ? sender.name : receiver.name,
    riderPhone: senderType === 'rider' ? sender.phone : receiver.phone,
    riderLocation: senderType === 'rider' ? sender.location : receiver.location,
    status: 'pending', // pending, accepted, rejected
    timestamp: new Date().toISOString()
  };

  rideRequests.set(requestId, request);

  res.json({ message: 'Request sent successfully', request });
});

// GET endpoint - Get pending requests for a user (rider or driver)
app.get('/api/ride-requests/:userId/:userType', (req, res) => {
  const { userId, userType } = req.params;

  const requests = Array.from(rideRequests.values())
    .filter(req => {
      if (userType === 'rider') {
        // Get requests sent TO this rider (from drivers)
        return req.riderId === userId && req.senderType === 'driver' && req.status === 'pending';
      } else {
        // Get requests sent TO this driver (from riders)
        return req.driverId === userId && req.senderType === 'rider' && req.status === 'pending';
      }
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  res.json({ requests, total: requests.length });
});

// GET endpoint - Get request status for driver
app.get('/api/ride-request-status/:driverId', (req, res) => {
  const { driverId } = req.params;

  const requests = Array.from(rideRequests.values())
    .filter(req => req.driverId === driverId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  res.json({ requests, total: requests.length });
});

// POST endpoint - Accept or reject ride request
app.post('/api/ride-request/respond', (req, res) => {
  const { requestId, status } = req.body; // status: 'accepted' or 'rejected'

  if (!requestId || !status) {
    return res.status(400).json({ error: 'Missing requestId or status' });
  }

  if (status !== 'accepted' && status !== 'rejected') {
    return res.status(400).json({ error: 'Invalid status. Must be "accepted" or "rejected"' });
  }

  const request = rideRequests.get(requestId);

  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  if (request.status !== 'pending') {
    return res.status(400).json({ error: 'Request already responded to' });
  }

  request.status = status;
  request.respondedAt = new Date().toISOString();
  rideRequests.set(requestId, request);

  res.json({ message: `Request ${status} successfully`, request });
});

// Cleanup inactive users every 5 minutes
setInterval(() => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  for (const [id, driver] of liveDrivers.entries()) {
    if (new Date(driver.lastUpdate) < fiveMinutesAgo) {
      liveDrivers.delete(id);
      console.log(`Removed inactive driver: ${driver.name}`);
    }
  }

  for (const [id, rider] of liveRiders.entries()) {
    if (new Date(rider.lastUpdate) < fiveMinutesAgo) {
      liveRiders.delete(id);
      console.log(`Removed inactive rider: ${rider.name}`);
    }
  }

  // Cleanup old requests (older than 30 minutes)
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  for (const [id, request] of rideRequests.entries()) {
    if (new Date(request.timestamp) < thirtyMinutesAgo) {
      rideRequests.delete(id);
      console.log(`Removed old request: ${id}`);
    }
  }
}, 5 * 60 * 1000);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
initDataDirectory().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ GreenRoute Server running on http://localhost:${PORT}`);
    console.log(`📁 Data stored in: ${path.join(__dirname, 'data')}`);
  });
});
