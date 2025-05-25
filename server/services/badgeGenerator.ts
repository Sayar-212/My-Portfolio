import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";

interface BadgeOptions {
  name: string;
  email: string;
  photoURL: string | null;
}

// Function to generate a badge image as a Buffer
export async function generateBadge({ name, email, photoURL }: BadgeOptions): Promise<Buffer> {
  // Create a canvas (600x600 pixels)
  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");
  
  // Draw background gradient
  const gradient = ctx.createLinearGradient(0, 0, 600, 600);
  gradient.addColorStop(0, "#4f46e5");  // primary color
  gradient.addColorStop(1, "#10b981");  // secondary color
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 600);
  
  // Draw rounded rectangle
  ctx.beginPath();
  ctx.roundRect(50, 50, 500, 500, 20);
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fill();
  
  // Add verified badge icon
  ctx.beginPath();
  ctx.arc(500, 100, 40, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  
  ctx.fillStyle = "#4f46e5";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("✓", 500, 115);
  
  // Load and draw profile image
  try {
    // Placeholder circle for the profile image
    ctx.beginPath();
    ctx.arc(300, 200, 100, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    
    // If user has a profile photo, try to load and draw it
    if (photoURL) {
      try {
        const img = await loadImage(photoURL);
        
        // Create a circular clipping path
        ctx.save();
        ctx.beginPath();
        ctx.arc(300, 200, 95, 0, Math.PI * 2);
        ctx.clip();
        
        // Draw the image within the clipping path
        ctx.drawImage(img, 205, 105, 190, 190);
        ctx.restore();
      } catch (imgError) {
        console.error("Failed to load profile image:", imgError);
        // Fall back to drawing initials
        ctx.fillStyle = "#4f46e5";
        ctx.font = "bold 80px Arial";
        ctx.textAlign = "center";
        ctx.fillText(name.charAt(0).toUpperCase(), 300, 225);
      }
    } else {
      // If no photoURL, draw user initial
      ctx.fillStyle = "#4f46e5";
      ctx.font = "bold 80px Arial";
      ctx.textAlign = "center";
      ctx.fillText(name.charAt(0).toUpperCase(), 300, 225);
    }
  } catch (error) {
    console.error("Error creating profile image on badge:", error);
  }
  
  // Draw badge title
  ctx.fillStyle = "white";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Sayar Basu", 300, 340);
  
  // Draw subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = "24px Arial";
  ctx.fillText("AI/ML Engineer & GenAI Specialist", 300, 380);
  
  // Draw visitor name
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.font = "bold 28px Arial";
  ctx.beginPath();
  ctx.roundRect(150, 420, 300, 50, 25);
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fill();
  
  ctx.fillStyle = "white";
  ctx.fillText(name, 300, 455);
  
  // Draw badge ID at bottom
  const badgeId = `AIML${Math.floor(1000 + Math.random() * 9000)}`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "16px Arial";
  ctx.fillText(`Badge #${badgeId}`, 300, 520);
  
  // Convert canvas to buffer
  return canvas.toBuffer('image/png');
}
