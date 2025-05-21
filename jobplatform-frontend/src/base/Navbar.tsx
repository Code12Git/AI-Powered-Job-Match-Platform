import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Navbar = () => {
    const authenticated = useAuth()
    const logoutHandler = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('persist:root');
    };
    
  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-600">
              JobMatchAI
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition">Jobs</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium transition">Profile</Link>
            <Link to="/recommendations" className="text-gray-700 hover:text-blue-600 font-medium transition">Matches</Link>
            <Link onClick={logoutHandler} to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">{authenticated?"Logout":"Login"}</Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
