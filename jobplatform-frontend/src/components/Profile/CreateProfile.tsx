import { motion } from 'framer-motion';
 
const CreateProfile = () => {
 

  // Sample skills data - replace with your actual skills list
  const availableSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'UI/UX Design',
    'Project Management', 'Data Analysis', 'Cloud Computing'
  ];

 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4"
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <motion.h2 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-center text-gray-800 mb-8"
            >
              Complete Your Profile
            </motion.h2>

            <form className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </motion.div>

              {/* Location Field */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </motion.div>

              {/* Years of Experience */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <select
                  name="experience"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select years</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </motion.div>

              {/* Skills Multi-select */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => (
                      <motion.button
                        key={skill}
                        type="button"
                         whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 rounded-full text-sm  `}
                      >
                        {skill}
                      </motion.button>
                    ))}
                  </div>
                  <input 
                    type="hidden" 
                    name="skills" 
                   />
                </div>
              </motion.div>

              {/* Preferred Job Type */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Job Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Remote', 'Onsite', 'Hybrid'].map((type) => (
                    <motion.div
                      key={type}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center"
                    >
                      <input
                        type="radio"
                        id={type.toLowerCase()}
                        name="job_type"
                        value={type.toLowerCase()}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={type.toLowerCase()}
                        className="w-full py-2 px-3 text-center rounded-lg border border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 cursor-pointer"
                      >
                        {type}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Save Profile
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateProfile;