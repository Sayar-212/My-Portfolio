# Sayar Basu Portfolio

A professional portfolio showcasing Sayar's projects, skills, and achievements in AI/ML and software development.

## Features

- Professional project showcase with blur effect for unauthenticated users
- Firebase authentication
- Badge generation and email sending on sign-in
- Contact form
- Responsive design with dark/light mode

## Deployment to Vercel

This project has been configured for seamless deployment to Vercel. Follow these steps to deploy:

### Prerequisites

1. A [Vercel](https://vercel.com) account
2. [Git](https://git-scm.com/) installed on your machine

### Deployment Steps

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository containing your portfolio

3. **Configure Environment Variables**:
   Add the following environment variables in the Vercel project settings:
   - `EMAIL_USER` - Your Gmail address for sending badge emails
   - `EMAIL_PASSWORD` - Your Gmail app password
   - `VITE_FIREBASE_API_KEY` - Firebase API key
   - `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
   - `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
   - `VITE_FIREBASE_APP_ID` - Firebase app ID

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

5. **Verify Deployment**:
   - Once deployment is complete, Vercel will provide you with a URL
   - Visit the URL to verify your portfolio is working correctly
   - Test authentication, badge generation, and contact form functionality

## Local Development

To run this project locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the required environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/client` - Frontend React application
- `/server` - Express backend server
- `/api` - Serverless functions for Vercel deployment
- `/shared` - Shared types and utilities

## Technologies Used

- React with TypeScript
- Firebase Authentication
- Express.js
- Tailwind CSS
- Vercel Serverless Functions
- Nodemailer for email functionality
