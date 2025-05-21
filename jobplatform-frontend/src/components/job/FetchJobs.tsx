import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import JobModal from '../../ui/modal/JobModal';
import type { Job } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchJob } from '../../redux/actions/jobAction';
import { FiBriefcase } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

const FetchJobs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const dispatch = useAppDispatch();
  const { isLoading, jobData, filteredData } = useAppSelector((state) => state.job);
  
  useEffect(() => {
    dispatch(fetchJob());
  }, [dispatch]);

  console.log(jobData)

  const handleOpenModal = (job: Job) => {
    setSelectedJob(job);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedJob(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const newJobData = filteredData ? filteredData : jobData
  console.log(newJobData)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Jobs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(newJobData) && newJobData.map((job: Job, index: number) => (
          <motion.div
            key={job._id}
            onClick={() => handleOpenModal(job)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                  <p className="text-blue-600 font-medium">{job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  job.jobType === 'full-time' 
                    ? 'bg-green-100 text-green-800' 
                    : job.jobType === 'part-time' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {job.jobType}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-gray-500 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{job.location.city}, {job.location.state}</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex gap-2 items-center text-gray-500 mb-2">
                  <FiBriefcase />
                  <span>{job.experience}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill: string) => (
                    <span 
                      key={skill} 
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
                <span className="text-xs text-gray-500">   Posted {job.createdAt ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }) : '2 days ago'}

                </span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <JobModal job={selectedJob} isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default FetchJobs;