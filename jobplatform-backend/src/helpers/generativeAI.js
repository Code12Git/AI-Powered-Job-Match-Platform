const { GoogleGenerativeAI } = require('@google/generative-ai');
const { fromEnv } = require('../utils');

const generateJobRecommendation = async (userProfile, jobData) => {

    const genAI = new GoogleGenerativeAI(fromEnv('GOOGLE_GEMINI_API_KEY'));
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const jobContext = jobData.slice(0, 50).map(job => {
            if (!job || !job.title) return null;
            
            const location = job.location 
                ? `${job.location.city || ''}, ${job.location.state || ''}, ${job.location.country || ''}`.trim().replace(/,\s*$/, '')
                : 'Remote';
                
            return `Title: ${job.title} | Description: ${job.description?.slice(0, 100) || 'No description'}... | ` +
                   `Salary: ${job.salary || 'Not specified'} | Skills: ${job.skills?.join(', ') || 'None'} | ` +
                   `Location: ${location} | Type: ${job.jobType || 'Not specified'} | ` +
                   `Experience: ${job.experience || 'Flexible'} | Company: ${job.company || 'Confidential'} | ` +
                   `JobId: ${job._id?.toString() || 'unknown'}`;
        }).filter(Boolean).join('\n');

        const prompt = `
        You are an expert career matchmaker. Analyze this user profile against these job opportunities:
        
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
        `;

        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        
        let recommendations;
        try {
            const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            recommendations = JSON.parse(jsonString);
            
            if (!recommendations?.recommendations || !Array.isArray(recommendations.recommendations)) {
                throw new Error('Invalid response format');
            }

            recommendations.recommendations = recommendations.recommendations.map(rec => {
                if (!rec.jobId) return null;
                
                const fullJob = jobData.find(job => 
                    job._id && job._id.toString() === rec.jobId
                );
                
                return fullJob ? {
                    ...rec,
                    fullDescription: fullJob.description,
                    benefits: fullJob.benefits,
                    postedDate: fullJob.postedDate,
                    applyLink: fullJob.applyLink,
                    missingSkills: Array.isArray(rec.missingSkills) 
                        ? rec.missingSkills.filter(skill => 
                            !userProfile.skills?.includes(skill)
                          ) 
                        : [],
                    matchScore: Math.min(100, Math.max(0, rec.matchScore || 0)),
                    locationMatch: ['perfect', 'partial', 'none'].includes(rec.locationMatch) 
                        ? rec.locationMatch 
                        : 'none'
                } : null;
            }).filter(Boolean);
            
            if (recommendations.recommendations.length > 3) {
                recommendations.recommendations = recommendations.recommendations.slice(0, 3);
            }
            
            return recommendations;
            
        } catch (e) {
            console.error('Parsing error:', responseText, e);
            throw new Error('Failed to parse AI response');
        }
        
    } catch(error) {
        console.error('AI recommendation error:', error);
        throw new Error('Failed to generate recommendations');
    }
};

module.exports = generateJobRecommendation