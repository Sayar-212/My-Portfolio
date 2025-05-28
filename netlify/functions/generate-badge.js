const { generateBadge } = require('../../server/services/badgeGenerator.js');

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  try {
    // Get data from either query params (GET) or body (POST)
    const data = event.httpMethod === 'GET' 
      ? event.queryStringParameters
      : JSON.parse(event.body);
    
    // Validate data
    if (!data.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: "Email is required" })
      };
    }
    
    // Generate badge image
    const badgeBuffer = await generateBadge({
      name: data.name || "Guest",
      email: data.email,
      photoURL: data.photoURL || null
    });
    
    // Set appropriate headers for image response
    const responseHeaders = {
      ...headers,
      'Content-Type': 'image/png',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    
    // For POST requests or when download=true, set as attachment
    if (event.httpMethod === 'POST' || data.download === 'true') {
      const filename = `${(data.name || 'guest').toLowerCase().replace(/\s+/g, '_')}_visitor_sayar_basu.png`;
      responseHeaders['Content-Disposition'] = `attachment; filename=${filename}`;
    }
    
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: badgeBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error("Error generating badge:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: "Failed to generate badge" })
    };
  }
};
