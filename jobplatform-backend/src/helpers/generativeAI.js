const { GoogleGenerativeAI } = require('@google/generative-ai');
const { fromEnv } = require('../utils');

exports.generateJobRecommendation = async (userProfile, jobData) => {
    const genAI = new GoogleGenerativeAI(fromEnv('GOOGLE_GEMINI_API_KEY'));
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare job data context with proper location formatting
        const jobContext = jobData.slice(0, 50).map(job => {
            const location = job.location 
                ? `${job.location.city}, ${job.location.state}, ${job.location.country || ''}`.trim()
                : 'Remote';
                
            return `Title: ${job.title} | Description: ${job.description.slice(0, 100)}... | Salary: ${job.salary || 'Not specified'} | ` +
                   `Skills: ${job.skills.join(', ')} | Location: ${location} | ` +
                   `Type: ${job.jobType} | Experience: ${job.experience || 'Flexible'} | ` +
                   `Company: ${job.company || 'Confidential'}`+`JobId: ${job._id}`;
        }).join('\n');

        const prompt = `
        You are an expert career matchmaker. Analyze this user profile against these job opportunities:
        
        User Profile:
        - Skills: ${userProfile.skills.join(', ')}
        - Experience: ${userProfile.experience} years
        - Preferred Job Type: ${userProfile.jobType || 'Flexible'}
        - Location Preference: ${userProfile.locationPreference || 'Any'}
        
        Available Jobs (showing ${Math.min(50, jobData.length)} of ${jobData.length}):
        ${jobContext}
        
        Recommend exactly 3 jobs that best match the user's profile. For each recommendation:
        
        1. Must reference existing jobs from the provided list
        2. Include location compatibility assessment
        3. Consider salary expectations if provided
        4. Highlight both matching and missing requirements
        
        Required Response Format (JSON):
        {
          "recommendations": [
            {
              "jobId": "original_job_id",
              "jobTitle": "string",
              "company": "string",
              "location": "string",
              "matchScore": 0-100,
              "salary": "string",
              "skillsMatch": ["string"],
              "missingSkills": ["string"],
              "reason": "string",
              "locationMatch": "perfect/partial/none",
              "experienceFit": "overqualified/perfect/underqualified"
            }
          ]
        }
        
        Important Rules:
        - Never invent jobs not in the provided list
        - Location match must consider user preferences
        - Experience fit should compare job requirements vs user's experience
        - Salary should be noted if significantly above/below market
        `;

        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        
        let recommendations;
        try {
            const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            recommendations = JSON.parse(jsonString);
            
            recommendations.recommendations = recommendations.recommendations.map(rec => {
                const fullJob = jobData.find(job => job._id.toString() === rec.jobId);
                return fullJob ? {
                    ...rec,
                    fullDescription: fullJob.description,
                    benefits: fullJob.benefits,
                    postedDate: fullJob.postedDate,
                    applyLink: fullJob.applyLink,
                    skillsMatch:fullJob.skillsMatch
                } : rec;
            });
            
            console.log(recommendations)
            return recommendations;
            
        } catch (e) {
            console.error('Parsing error:', responseText, e);
            throw new Error('Failed to parse AI response');
        }
        
    } catch(error) {
        console.error('AI recommendation error:', error);
        throw error;
    }
}
