import { z } from 'zod';

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required")
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = contactFormSchema.parse(req.body);
    
    // Store contact in database (simplified for this example)
    // In a real application, you would save this to a database
    console.log("Contact form submission:", data);
    
    return res.status(200).json({ success: true, message: "Message received" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid form data", 
        errors: error.errors 
      });
    }
    
    return res.status(500).json({ success: false, message: "Failed to process contact form" });
  }
}
