import { sendBadgeEmail } from '../server/services/emailService.js';
import { generateBadge } from '../server/services/badgeGenerator.js';
import { z } from 'zod';

// Validation schema
const sendBadgeSchema = z.object({
  email: z.string().email(),
  name: z.string().nullable().optional(),
  photoURL: z.string().nullable().optional()
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = sendBadgeSchema.parse(req.body);
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
    
    return res.status(200).json({ success: true, message: "Badge email sent successfully" });
  } catch (error) {
    console.error("Error sending badge email:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid request data", 
        errors: error.errors 
      });
    }
    
    return res.status(500).json({ success: false, message: "Failed to send badge email" });
  }
}
