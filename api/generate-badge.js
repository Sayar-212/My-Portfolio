import { generateBadge } from '../server/services/badgeGenerator';
import { z } from 'zod';

// Validation schema
const generateBadgeSchema = z.object({
  email: z.string().email(),
  name: z.string().nullable().optional(),
  photoURL: z.string().nullable().optional()
});

export default async function handler(req, res) {
  try {
    // Get data from either query params (GET) or body (POST)
    const data = req.method === 'GET' 
      ? {
          name: req.query.name,
          email: req.query.email,
          photoURL: req.query.photoURL
        }
      : req.body;
    
    // Validate data
    const validatedData = generateBadgeSchema.parse(data);
    
    // Generate badge image
    const badgeBuffer = await generateBadge({
      name: validatedData.name || "Guest",
      email: validatedData.email,
      photoURL: validatedData.photoURL || null
    });
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // For POST requests or when download=true, set as attachment
    if (req.method === 'POST' || req.query.download === 'true') {
      const filename = `${(validatedData.name || 'guest').toLowerCase().replace(/\s+/g, '_')}_visitor_sayar_basu.png`;
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    }
    
    return res.status(200).send(badgeBuffer);
  } catch (error) {
    console.error("Error generating badge:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid request data", 
        errors: error.errors 
      });
    }
    
    return res.status(500).json({ success: false, message: "Failed to generate badge" });
  }
}
