import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaLock } from 'react-icons/fa';

import projectAstra from '../../assets/projectAstra.png'

const Projects = () => {
  return (
    <div id="projects" className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4 pt-[10rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-gray-400">Here's what I have worked previously</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[300px] md:h-full">
              <div className="absolute inset-0 bg-gray-700 animate-pulse">
                <img 
                  src={projectAstra}
                  alt="Project Name"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Project Name</h3>
              <p className="text-gray-400 mb-6">
                This project is a web application intendted for the organizations advertisment and official website.
                It Showcases the organizations events, teams, and achievements in the esports community.
              </p>

              <div className="mb-6">                        
                <h4 className="text-sm font-semibold mb-3 text-gray-300">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Javascript</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Tailwind CSS</span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">Key Features:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Feature 1 description</li>
                  <li>Feature 2 description</li>
                  <li>Feature 3 description</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <motion.button
                  disabled
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 rounded-lg cursor-not-allowed opacity-50 relative group"
                  title="Code is private"
                >
                  <span className="text-sm"><FaLock /></span>
                  <span>View Code</span>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Code is private
                  </div>
                </motion.button>
                <motion.a
                  href="https://astraeus-esports.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 border border-pink-500 rounded-lg hover:bg-pink-500 hover:bg-opacity-10 transition-colors"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;