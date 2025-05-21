import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchProfile } from "../redux/actions/profileAction";
import { privateRequest } from "../helpers/axios";
import { type JobSuggested } from "../types";

const Match = () => {
    const dispatch = useAppDispatch()
    const [suggestedJobs,setSuggestedJobs] = useState<JobSuggested>([])
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {profileData} = useAppSelector(state=>state.profile)
    const {jobData} = useAppSelector(state=>state.job)
    console.log(profileData)
    console.log(jobData)
    useEffect(()=>{
        dispatch(fetchProfile())
    },[dispatch])

    const fetchJobRecommendation = async() => {
      try{
        setIsLoading(true)
        const res = await privateRequest.post('/job/recommendation',{profileData:profileData,jobData:jobData})
        setSuggestedJobs(res.data.data.recommendations)
        setIsLoading(false)
      }catch(err){
        console.error(err)
      }finally{
        setIsLoading(false)
      }
    }
    
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Job Matcher
          </h1>
          <p className="text-lg text-gray-600">
            Discover your perfect job matches with our AI-powered recommendation system
          </p>
        </motion.div>

        {/* Find Matches Button */}
        <div className="flex justify-center mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchJobRecommendation}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Find My Matches
          </motion.button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
  {!isLoading?suggestedJobs?.map((job, index) => (
    <motion.div
      key={job.jobId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-100 hover:translate-y-[-2px]"
    >
      {/* Header with logo and basic info */}
      <div className="flex items-start mb-5">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-blue-600 font-bold text-lg">{job.jobId.slice(-4)}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{job.jobTitle}</h3>
          <p className="text-gray-600 text-sm mt-1">{job.company}</p>
          <div className="flex items-center mt-2">
            <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium text-gray-500">
              {job.location} • {job.locationMatch} match
            </span>
          </div>
        </div>
      </div>

      {/* Description with read more */}
      <div className="mb-5">
        <p className="text-gray-700 text-sm line-clamp-3 mb-2">{job.fullDescription}</p>
        <button className="text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors">
          Read more
        </button>
      </div>

      {/* Key details in grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Experience</p>
          <p className="text-sm font-medium text-gray-800">{job.experienceFit}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Salary</p>
          <p className="text-sm font-medium text-gray-800">${job.salary}</p>
        </div>
      </div>

      {/* Skills sections */}
      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills Match</h4>
          <div className="flex flex-wrap gap-2">
            {job.skillsMatch.map((skill, i) => (
              <span
                key={`match-${i}`}
                className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center"
              >
                <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {job.missingSkills.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Missing Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.missingSkills.map((skill, i) => (
                <span
                  key={`miss-${i}`}
                  className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full flex items-center"
                >
                  <svg className="w-3 h-3 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer with match score and CTA */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-500">Match Score</p>
          <div className="flex items-center">
            <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${job.matchScore}%` }}
              ></div>
            </div>
            <span className="text-sm font-bold text-blue-600">{job.matchScore}%</span>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Apply Now
        </button>
      </div>
    </motion.div>
  )):(  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>)}
</div>
      </div>
    </div>
  );
};

export default Match;