import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gamingbg from '../../assets/gamingbg.gif'
import AboutMe from "./AboutMe"
import Skills from './Skills'
import Hobbies from './Hobbies'

const About = () => {
  const [activeSection, setActiveSection] = useState<'about' | 'skills' | 'hobbies'>('about')

  const sections = [
    { id: 'about', label: 'About Me', icon: '👋' },
    { id: 'skills', label: 'Tech Stack', icon: '💻' },
    { id: 'hobbies', label: 'Hobbies', icon: '🎮' },
  ] as const;

  return (
    <div
      id="about"
      className="h-screen w-full relative overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(${gamingbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0" />
      <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-center items-center h-full w-full px-4">
        <div className="w-full md:w-[300px] flex md:flex-col gap-4 justify-center items-center">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full md:w-[250px] py-4 px-6 rounded-xl text-white font-bold text-xl
                flex items-center justify-center gap-3 transition-all duration-300
                ${activeSection === section.id 
                  ? 'bg-pink-500 shadow-lg shadow-pink-500/50' 
                  : 'bg-gray-800/50 hover:bg-gray-700/50'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{section.icon}</span>
              <span>{section.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-[60%] h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeSection === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <AboutMe />
              </motion.div>
            )}
            {activeSection === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Skills />
              </motion.div>
            )}
            {activeSection === 'hobbies' && (
              <motion.div
                key="hobbies"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Hobbies />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default About
