import { motion } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { NavLink} from 'react-router-dom';
const Dashboard = () => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      backgroundPosition: ['0% 50%', '100% 50%'],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear'
      }
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e, #f59e0b)',
        backgroundSize: '300% 300%',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full"
      >
        <motion.h1 
          className="text-4xl font-bold text-white mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.6,
            delay: 0.2
          }}
        >
          Welcome to Your Dashboard
        </motion.h1>
        
        <motion.p
          className="text-white/80 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Everything you need in one place
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
        <NavLink to='/profile'><button className="px-6 py-2 bg-white text-indigo-600 rounded-full font-medium hover:bg-white/90 transition-all">
            Get Started
          </button>
          </NavLink> 
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;