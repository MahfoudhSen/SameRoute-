#!/bin/bash

# GreenRoute - API Key Configuration Script
# This script will configure your Google Maps API key

echo "🗺️  GreenRoute - Google Maps API Key Setup"
echo "=========================================="
echo ""

# Check if API key is provided as argument
if [ -z "$1" ]; then
    echo "📝 Please enter your Google Maps API key:"
    echo "(It should start with 'AIza...')"
    echo ""
    read -p "API Key: " API_KEY
else
    API_KEY=$1
fi

# Validate API key format
if [[ ! $API_KEY =~ ^AIza ]]; then
    echo "❌ Error: API key should start with 'AIza'"
    echo "Please check your key and try again"
    exit 1
fi

echo ""
echo "✅ API key format looks good!"
echo ""

# Update config.js
CONFIG_FILE="Frontend/config.js"
if [ -f "$CONFIG_FILE" ]; then
    sed -i.bak "s/YOUR_API_KEY_HERE/$API_KEY/g" "$CONFIG_FILE"
    echo "✅ Updated $CONFIG_FILE"
else
    echo "⚠️  $CONFIG_FILE not found"
fi

# Update live-matching.html
echo "✅ API key will be loaded from browser localStorage"
echo ""

# Create a simple HTML file to set localStorage
cat > Frontend/set-api-key.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Setting API Key...</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #1a1a1a;
            color: #e8f3ec;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .container {
            max-width: 500px;
            padding: 40px;
            background: #242424;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        h1 {
            color: #a3e635;
            margin-bottom: 20px;
        }
        .success {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        a {
            display: inline-block;
            background: #2f9e44;
            color: white;
            padding: 14px 28px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 20px;
        }
        a:hover {
            background: #27823a;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅</div>
        <h1>API Key Saved!</h1>
        <p>Your Google Maps API key has been configured.</p>
        <p style="margin-top: 20px; color: #9fb3a5; font-size: 0.9rem;">
            Key: ${API_KEY:0:20}...
        </p>
        <a href="live-matching.html">Open Live Matching →</a>
    </div>
    <script>
        localStorage.setItem('googleMapsApiKey', '$API_KEY');
        console.log('API Key saved to localStorage');
    </script>
</body>
</html>
EOF

echo "=========================================="
echo "✅ Configuration Complete!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Open in your browser:"
echo "   http://localhost:8000/set-api-key.html"
echo ""
echo "2. This will save your API key"
echo ""
echo "3. Then click 'Open Live Matching' or visit:"
echo "   http://localhost:8000/live-matching.html"
echo ""
echo "🎉 Your full Google Maps version is ready!"
echo "=========================================="
