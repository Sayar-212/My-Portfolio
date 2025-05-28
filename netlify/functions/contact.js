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
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: "All fields are required: name, email, subject, message" 
        })
      };
    }
    
    // Store contact in database (simplified for this example)
    // In a real application, you would save this to a database
    console.log("Contact form submission:", data);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Message received" })
    };
  } catch (error) {
    console.error("Error processing contact form:", error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: "Failed to process contact form" })
    };
  }
};
