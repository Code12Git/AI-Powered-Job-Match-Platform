#  AI-Powered Job Match Platform

## Overview

This is a full-stack application that helps job seekers find relevant job openings using AI-powered recommendations. Users can create profiles, browse job listings, and get personalized job suggestions based on their skills and experience.

<img width="1425" alt="Image" src="https://github.com/user-attachments/assets/cb31f456-0812-4648-a139-0c71467f81a1" />

<img width="1427" alt="Image" src="https://github.com/user-attachments/assets/b160c352-cd63-4fb4-bc5b-0f505141e5d5" />

<img width="1440" alt="Image" src="https://github.com/user-attachments/assets/8114c318-6410-47b6-9a84-cfca6ac8348a" />


## Features

### Core Features

- User Authentication: Sign up, login, and logout functionality

- Profile Management: Create and edit user profiles with    skills, experience, and preferences

- Job Listings: Browse available job opportunities

- AI Recommendations: Get personalized job matches using AI analysis

- Responsive Design: Fully mobile-friendly interface

## Tech Stack

### Admin Panel
- React.js

- Tailwind CSS

- Shadcn ui

- Axios for API calls

### Frontend User
- React.js

- Tailwind CSS

- Redux(for state management)

- Axios for API calls

### Backend

- Node.js with Express

- MongoDB with Mongoose ODM

- JWT for authentication

- AI Integration
- OpenAI API for job recommendation analysis

## Installation

## Prerequisites
- Node.js (v16 or higher)

- MongoDB Atlas account or local MongoDB instance

- Google Gemini API key

### Backend Setup
``` bash
- Clone the repository

- Navigate to the backend directory: cd jobplatform-backend

- Install dependencies: npm install

- Create a .env file based on .env.example

- Start the server: npm run dev
```
### Frontend User Setup
``` bash

- Navigate to the frontend directory: cd jobplatform-frontend

- Install dependencies: npm install

- Create a .env file based on .env.example

- Start the development server: npm run dev
```
### Frontend Admin Setup
``` bash

- Navigate to the frontend directory: cd jobplatform-admin

- Install dependencies: npm install

- Create a .env file based on .env.example

- Start the development server: npm run dev

- ADMIN USER : admin@example.com
- ADMIN PASS: Admin123@
```


### AI Integration

- The AI recommendation system works by:

- Collecting user profile data (skills, experience, preferences)

- Combining this with available job listings

- Sending this information to Google gemini with a carefully crafted prompt

- Processing the response to identify top 3 matches

### Prompt Design

- The system uses the following prompt structure with OpenAI:

" You are an expert career matchmaker. Analyze this user profile against these job opportunities:
        
        User Profile:
        - Skills: ${userProfile.skills?.join(', ') || 'Not specified'}
        - Experience: ${userProfile.experience || 'Not specified'} years
        - Preferred Job Type: ${userProfile.jobType || 'Flexible'}
        - Location Preference: ${userProfile.locationPreference || 'Any'}
        
        Available Jobs (showing ${Math.min(50, jobData.length)} of ${jobData.length}):
        ${jobContext}
        
        Recommend exactly 3 jobs that best match the user's profile. For each recommendation:
        
        1. Must reference existing jobs from the provided list by their JobId
        2. Include location compatibility assessment
        3. Consider salary expectations if provided
        4. Highlight ONLY MISSING SKILLS (skills required by the job but not in the user's profile)
        
        Required Response Format (JSON only):
        {
          "recommendations": [
            {
              "jobId": "original_job_id",
              "jobTitle": "string",
              "company": "string",
              "location": "string",
              "matchScore": 0-100,
              "salary": "string",
              "missingSkills": ["string"],  // ONLY skills the user lacks
              "reason": "string",
              "locationMatch": "perfect/partial/none",
              "experienceFit": "overqualified/perfect/underqualified"
            }
          ]
        }
        
        Important Rules:
        - Only recommend jobs that exist in the provided list
        - Missing skills should ONLY include skills required by the job but NOT in the user profile
        - Do NOT include matching skills in the response
        - Location match must consider user preferences
        - Experience fit should compare job requirements vs user's experience
        - Match score should reflect overall compatibility (skills, location, experience)
        `;"
This prompt ensures the AI considers all relevant factors and returns structured, actionable results.

## API Documentation
### Authentication

- POST /api/auth/v1/register - Register a new user

- POST /api/v1/auth/login - Login existing user



### Profiles

- GET /api/v1/profile - Get current user profile (protected)

- POST /api/v1/profile - Create/update profile (protected)

### Jobs
- GET /api/v1/jobs/all - Get all job listings

- POST /api/v1/jobs/recommendation - Get AI recommendations (protected)

## Architecture
### Frontend
- Components organized by feature (auth, profile, jobs)

- Redux for global state management

- Custom hooks for API calls

- Responsive layouts with Tailwind CSS

### Backend

- MVC architecture

- RESTful API design

- Middleware for authentication and error handling

- MongoDB for data persistence

## Trade-offs & Assumptions

- Data: Using a admin created list of jobs.

- AI Accuracy: The recommendation quality depends heavily on the prompt design and available job data

- Performance: No advanced caching implemented for the MVP

- Security: Basic authentication implemented - production would require additional measures

## Deployment
- Frontend deployed on Netlify: https://dainty-kelpie-d6b7ec.netlify.app/login
- Admin deployed on Vercel: https://ai-powered-job-match-platform-3lqiv1tnw-code12gits-projects.vercel.app/login
- Backend deployed on Render:https://ai-powered-job-match-platform-hbhf.onrender.com/
- API Base URL: https://ai-powered-job-match-platform-hbhf.onrender.com/api/v1

## Future Improvements

Enhance recommendation algorithm with more factors

Add testing coverage

Adding more features in admin and user

License
MIT

