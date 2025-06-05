import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gamingbg from '../../assets/gamingbg.gif'
import AboutMe from "./AboutMe"
import Skills from './Skills'
import Hobbies from './Hobbies'

const About = () => {
  const [activeSection, setActiveSection] = useState<'about' | 'skills' | 'hobbies'>('about')

  return (
    <div
      id="about"
      className="h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${gamingbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      <div className="relative z-10 flex flex-row gap-2 justify-center items-center h-full w-full">
        <div className="w-[40%] h-full text-white flex flex-col justify-center items-center gap-4 font-bold text-[2rem]">
          <button onClick={() => setActiveSection('about')} className="cursor-pointer hover:scale-150 transition">
            ------ About Me
          </button>
          <button onClick={() => setActiveSection('skills')} className="cursor-pointer hover:scale-150 transition">
            ------ Tech Stack
          </button>
          <button onClick={() => setActiveSection('hobbies')} className="cursor-pointer hover:scale-150 transition">
            ------ Hobbies
          </button>
        </div>

        <div className="w-[60%] h-full overflow-y-auto flex justify-center items-center p-5">
          <AnimatePresence mode="wait">
            {activeSection === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <AboutMe />
              </motion.div>
            )}
            {activeSection === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Skills />
              </motion.div>
            )}
            {activeSection === 'hobbies' && (
              <motion.div
                key="hobbies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
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
