import { motion } from 'framer-motion';
import { availableSkills } from '../../data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ProfileFormData, profileSchema } from '../../validation/profileValidation';
import { useEffect, useState } from 'react';
import { privateRequest } from '../../helpers/axios';
import { useAppSelector } from '../../hooks/hooks';

const CreateProfile = () => {
  const {userData} = useAppSelector(state=>state.auth)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const {profileData} = useAppSelector(state=>state.profile)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: `${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`.trim(),
      location: {
        city: profileData?.location.city,
        state: profileData?.location.state,
        country: profileData?.location.country,
        postal_code: profileData?.location.postal_code
      },
      experience: "0-1",
      skills: profileData?.skills,
      jobType: 'remote'
    },
  });

  // Watch skills to sync with local state
  const formSkills = watch('skills');
  useEffect(() => {
    setSelectedSkills(formSkills || []);
  }, [formSkills]);

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    setValue('skills', newSkills);
  };

  const onSubmit = async(data: ProfileFormData) => {
     await privateRequest.post('/profile',data)
  };

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </motion.div>

              {/* Location Field */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="city" className="text-sm text-gray-600">City</label>
                    <input
                      id="city"
                      {...register("location.city")}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.location?.city ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.location?.city && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.location.city.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="state" className="text-sm text-gray-600">State</label>
                    <input
                      id="state"
                      {...register("location.state")}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.location?.state ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.location?.state && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.location.state.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="country" className="text-sm text-gray-600">Country</label>
                    <input
                      id="country"
                      {...register("location.country")}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.location?.country ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.location?.country && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.location.country.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="postal_code" className="text-sm text-gray-600">Postal Code</label>
                    <input
                      id="postal_code"
                      {...register("location.postal_code")}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.location?.postal_code ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.location?.postal_code && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.location.postal_code.message}
                      </p>
                    )}
                  </div>
                </div>
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
                  {...register("experience")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.experience ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>
                )}
              </motion.div>

              {/* Skills Multi-select */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills {errors.skills && (
                    <span className="text-red-500 text-sm font-normal"> - {errors.skills.message}</span>
                  )}
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => (
                      <motion.button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedSkills.includes(skill)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </motion.button>
                    ))}
                  </div>
                  <input type="hidden" {...register('skills')} />
                </div>
              </motion.div>

              {/* Preferred Job Type */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Job Type {errors.jobType && (
                    <span className="text-red-500 text-sm font-normal"> - {errors.jobType.message}</span>
                  )}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['remote', 'full-time', 'onsite', 'any', 'part-time', 'contract'].map((type) => (
                    <motion.div
                      key={type}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center"
                    >
                      <input
                        type="radio"
                        id={type}
                        {...register("jobType")}
                        value={type}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={type}
                        className={`w-full py-2 px-3 text-center rounded-lg border text-sm ${
                          errors.jobType ? 'border-red-300' : 'border-gray-300'
                        } peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 cursor-pointer transition-colors`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
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
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : 'Save Profile'}
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