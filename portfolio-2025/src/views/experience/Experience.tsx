import { motion } from 'framer-motion';
import { FaBriefcase, FaChevronRight } from 'react-icons/fa';

const experiences = [
  {
    title: 'Software Developer',
    subtitle: 'Research & Development Project',
    company: 'Channel Precision Inc',
    note: 'Internal Transfer',
    period: 'Year 2 – Present',
    color: 'bg-pink-500',
    highlights: [
      'Managed and maintained Amazon API pipelines (SP-API & Ads API), ensuring reliable data ingestion and high-throughput processing.',
      'Built a robust cloud-based data infrastructure using FastAPI and Google Cloud Platform to support company-wide analytics.',
      'Developed a real-time monitoring dashboard using ReactJS, continuously deployed via Vercel for instant stakeholder visibility.',
      'Implemented efficient CI/CD workflows using Google Cloud Build, significantly improving deployment speed and system reliability.',
      'Containerized modular applications using Docker to guarantee consistent environments across local development and production.',
      'Owned end-to-end deployment pipelines, incorporating environment setup, precise cloud configuration, and proactive system monitoring.',
    ],
    tags: ['FastAPI', 'GCP', 'ReactJS', 'Docker', 'Cloud Build', 'Vercel', 'SP-API', 'Ads API'],
  },
  {
    title: 'Software Developer',
    company: 'Channel Precision Inc',
    period: 'Nov 2023 – Present',
    color: 'bg-purple-500',
    highlights: [
      'Built complex internal web applications to streamline cross-department workflows, heavily improving overall operational efficiency.',
      'Developed automated scripts and custom internal tools to eliminate manual, repetitive tasks and consolidate multi-step processes.',
      'Created highly reusable modular code libraries for shared features, accelerating development turnarounds across multiple parallel projects.',
      'Transformed expansive raw datasets into structured, usable business assets through deep data cleaning, filtering, aggregation, and relational joins.',
      'Researched emerging software technologies and shared actionable insights to continuously improve core team development practices.',
    ],
    tags: ['ReactJS', 'Node.js', 'Automation', 'Data Processing'],
  },
  {
    title: 'UI Developer Intern',
    company: 'DNA Micro',
    period: 'Jan 2023 – Apr 2023',
    color: 'bg-blue-500',
    highlights: [
      'Completed rigorous, hands-on UI development training leveraging ReactJS, PugJS, and SASS.',
      'Gained practical enterprise experience with structural GitLab git workflows and component-driven architecture using Storybook.',
    ],
    tags: ['ReactJS', 'PugJS', 'SASS', 'Storybook', 'GitLab'],
  },
];

const Experience = () => {
  return (
    <div id="experience" className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 text-white py-20">
      <div className="max-w-5xl mx-auto px-4 pt-[6rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaBriefcase className="text-pink-500 text-2xl" />
            <h2 className="text-4xl font-bold">Professional Experience</h2>
          </div>
          <p className="text-gray-400">Where I've worked and what I've built</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 ${exp.color} rounded-full border-4 border-gray-900 z-10 hidden md:block`} />

              {/* Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 shadow-lg hover:shadow-pink-500/5"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    {exp.subtitle && (
                      <p className="text-pink-400 text-sm font-medium">{exp.subtitle}</p>
                    )}
                    <p className="text-gray-400 text-sm">
                      {exp.company}
                      {exp.note && <span className="text-gray-500"> ({exp.note})</span>}
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-gray-700/50 rounded-full text-gray-300 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-2 text-sm text-gray-300">
                      <FaChevronRight className="text-pink-500 text-xs mt-1.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tIndex) => (
                    <span 
                      key={tIndex} 
                      className="text-xs px-2.5 py-1 bg-gray-700/40 rounded-full text-gray-400 border border-gray-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
