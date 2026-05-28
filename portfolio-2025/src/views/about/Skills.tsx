import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaDocker, FaFigma, FaPython 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiVite, SiTailwindcss, SiStorybook, 
  SiFastapi, SiPostman, SiGooglecloud, SiVercel, 
  SiZapier, SiSass, SiRailway
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';

const skillCategories = [
  {
    title: 'Core Competencies',
    color: 'from-pink-500 to-rose-500',
    items: [
      'Full-Stack Development (Frontend-focused)',
      'UI/UX Design & Prototyping',
      'API Integration & Data Pipelines',
      'Cloud Infrastructure',
      'Workflow Automation',
      'CI/CD & Monitoring',
    ]
  },
  {
    title: 'Frontend Technologies',
    color: 'from-blue-500 to-cyan-500',
    items: [
      { name: 'ReactJS', icon: <FaReact /> },
      { name: 'NextJS', icon: <SiNextdotjs /> },
      { name: 'Vite', icon: <SiVite /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Zustand', icon: <TbBrandFramerMotion /> },
      { name: 'PugJS', icon: null },
      { name: 'SASS', icon: <SiSass /> },
      { name: 'Storybook', icon: <SiStorybook /> },
    ]
  },
  {
    title: 'Backend & Tools',
    color: 'from-green-500 to-emerald-500',
    items: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Cursor AI', icon: null },
      { name: 'Figma', icon: <FaFigma /> },
      { name: 'Zapier', icon: <SiZapier /> },
      { name: 'Postman', icon: <SiPostman /> },
    ]
  },
  {
    title: 'Cloud & Data',
    color: 'from-purple-500 to-violet-500',
    items: [
      { name: 'GCP', icon: <SiGooglecloud /> },
      { name: 'Cloud Run', icon: <SiGooglecloud /> },
      { name: 'BigQuery', icon: <SiGooglecloud /> },
      { name: 'Cloud Tasks', icon: <SiGooglecloud /> },
      { name: 'Cloud Schedulers', icon: <SiGooglecloud /> },
      { name: 'Cloud Build', icon: <SiGooglecloud /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Railway', icon: <SiRailway /> },
    ]
  },
];

const Skills = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center gap-6 items-center overflow-y-auto py-4 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: catIndex * 0.1 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50"
          >
            <h3 className={`text-lg font-bold mb-3 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, index) => {
                const isString = typeof item === 'string';
                const name = isString ? item : item.name;
                const icon = isString ? null : item.icon;
                return (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700/50 rounded-full text-sm text-gray-300 hover:text-white hover:bg-gray-600/50 transition-colors cursor-default"
                  >
                    {icon && <span className="text-base">{icon}</span>}
                    {name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Skills
