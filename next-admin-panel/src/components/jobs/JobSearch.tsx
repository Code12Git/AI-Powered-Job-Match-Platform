'use client'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin, FiBriefcase, FiDollarSign, FiChevronDown } from 'react-icons/fi'


const JobSearch = () => {


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
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <FiSearch className="absolute left-4 text-gray-400 text-xl" />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          {/* Location Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                <option>Anywhere</option>
                <option>New York</option>
                <option>San Francisco</option>
                <option>Remote</option>
              </select>
              <FiMapPin className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Job Type Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <div className="relative">
              <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                <option>All Types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
              <FiBriefcase className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Salary Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
            <div className="relative">
              <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                <option>Any Salary</option>
                <option>$50k - $80k</option>
                <option>$80k - $100k</option>
                <option>$100k+</option>
              </select>
              <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Experience Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <div className="relative">
              <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                <option>Any Experience</option>
                <option>Entry Level</option>
                <option>Mid Level</option>
                <option>Senior Level</option>
              </select>
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Job Listings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-5xl mx-auto"
      >
        {/* Job Card 1 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-4 border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Frontend Developer</h3>
                <p className="text-gray-600 mb-2">TechCorp • New York, NY</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">React</span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">TypeScript</span>
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Remote</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">$90,000 - $120,000</p>
                <p className="text-sm text-gray-500">Full-time</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">We{"'"}re looking for a skilled Frontend Developer to join our growing team and help build amazing user experiences.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Posted 2 days ago</span>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Apply Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Job Card 2 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-4 border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">UX Designer</h3>
                <p className="text-gray-600 mb-2">DesignHub • Remote</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-full">Figma</span>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">UI/UX</span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Remote</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">$80,000 - $100,000</p>
                <p className="text-sm text-gray-500">Full-time</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">Join our design team to create beautiful, intuitive interfaces for our suite of products.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Posted 1 week ago</span>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Apply Now
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default JobSearch