import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiSearch, FiBriefcase, FiChevronDown } from 'react-icons/fi'
import { useAppDispatch } from '../../hooks/hooks'
import { filteredJob, searchJob } from '../../redux/actions/jobAction'

interface FilterState {
  jobType: string;
  experience: string;
 }

const JobSearch = () => {
  const [title, setTitle] = useState('')
  const[searchTriggered,setSearchTriggered] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    jobType: 'any',
    experience: 'any'
  })
  const dispatch = useAppDispatch()
 
  useEffect(() => {
    if (searchTriggered) {
       dispatch(searchJob(title)).then(() => {
        dispatch(filteredJob(filters))
      })
    } else {
       dispatch(filteredJob(filters))
    }
  }, [filters, dispatch, title, searchTriggered])


  const searchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(searchJob(title))
    setSearchTriggered(true)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
    setSearchTriggered(false)
  }
  

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Search Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h2>
        <p className="text-lg text-gray-600">Browse thousands of job listings</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <FiSearch className="absolute left-4 text-gray-400 text-xl" />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={searchHandler}
            className="absolute right-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Search
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto bg-gray-50 rounded-xl p-4 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Job Type Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <div className="relative">
              <select 
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
              >
                <option value="any">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
              <FiBriefcase className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Experience Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <div className="relative">
              <select 
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
              >
                <option value="any">Any Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default JobSearch