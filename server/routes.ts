import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { sendBadgeEmail } from "./services/emailService";
import { generateBadge } from "./services/badgeGenerator";

// Validation schemas
const sendBadgeSchema = z.object({
  email: z.string().email(),
  name: z.string().nullable().optional(),
  photoURL: z.string().nullable().optional()
});

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Send badge email on user sign-in
  app.post("/api/send-badge", async (req, res) => {
    try {
      const data = sendBadgeSchema.parse(req.body);
      
      // Generate badge image
      const badgeBuffer = await generateBadge({
        name: data.name || "Guest",
        email: data.email,
        photoURL: data.photoURL || null
      });
      
      // Send email with badge
      await sendBadgeEmail({
        to: data.email,
        name: data.name || "Guest",
        badgeBuffer
      });
      
      res.status(200).json({ success: true, message: "Badge email sent successfully" });
    } catch (error) {
      console.error("Error sending badge email:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid request data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ success: false, message: "Failed to send badge email" });
    }
  });

  // Handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);
      
      // Store contact in database (simplified for this example)
      // In a real application, you would save this to a database
      console.log("Contact form submission:", data);
      
      res.status(200).json({ success: true, message: "Message received" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ success: false, message: "Failed to process contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
