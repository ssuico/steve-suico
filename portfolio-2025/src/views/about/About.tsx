import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { FaUser } from 'react-icons/fa'
import { HiOutlineChip } from 'react-icons/hi'
import gamingbg from '../../assets/gamingbg.gif'
import AboutMe from './AboutMe'
import Skills from './Skills'

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const [activeSection, setActiveSection] = useState<'about' | 'skills'>('about')

  const sections = [
    { id: 'about' as const, label: 'About Me', icon: FaUser },
    { id: 'skills' as const, label: 'Tech Stack', icon: HiOutlineChip },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-20 relative w-full min-h-screen overflow-hidden bg-black py-20"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-x-0 -top-[18%] -bottom-[18%]"
      >
        <img src={gamingbg} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-black/60" />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 md:flex-row">
        <div className="flex w-full flex-row justify-center gap-4 md:w-[250px] md:flex-col">
          {sections.map((section) => {
            const Icon = section.icon
            const selected = activeSection === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg font-bold text-white transition-colors ${
                  selected
                    ? 'bg-pink-500 shadow-lg shadow-pink-500/40'
                    : 'bg-gray-800/70 hover:bg-gray-700/70'
                }`}
              >
                <Icon className="text-xl" aria-hidden="true" />
                <span>{section.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex w-full items-center justify-center md:w-[70%]">
          <AnimatePresence mode="wait">
            {activeSection === 'about' ? (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <AboutMe />
              </motion.div>
            ) : (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <Skills />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default About
