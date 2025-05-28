const { sendBadgeEmail } = require('../../server/services/emailService.js');
const { generateBadge } = require('../../server/services/badgeGenerator.js');

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validate data
    if (!data.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: "Email is required"
        })
      };
    }
    
    console.log("Received badge email request for:", data.email);
    
    // Generate badge image
    const badgeBuffer = await generateBadge({
      name: data.name || "Guest",
      email: data.email,
      photoURL: data.photoURL || null
    });
    console.log("Badge generated successfully");
    
    // Send email with badge
    await sendBadgeEmail(
      data.email,
      data.name || "Guest",
      data.email,
      data.photoURL
    );
    console.log("Badge email sent successfully to:", data.email);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Badge email sent successfully" })
    };
  } catch (error) {
    console.error("Error sending badge email:", error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: "Failed to send badge email" })
    };
  }
};
