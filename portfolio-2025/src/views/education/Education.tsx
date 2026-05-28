import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const education = [
  {
    school: 'University of Southern Philippines Foundation',
    degree: 'Bachelor of Science in Information Technology',
    period: '2021 – 2023',
    location: 'Cebu City',
    color: 'bg-pink-500',
  },
  {
    school: 'STI College Cebu',
    degree: 'Bachelor of Science in Information Technology',
    period: '2020 – 2021',
    location: 'Cebu City',
    color: 'bg-purple-500',
  },
  {
    school: 'Cebu Institute of Technology University',
    degree: 'Bachelor of Science in Information Technology',
    period: '2019 – 2020',
    location: 'Cebu City',
    color: 'bg-blue-500',
  },
  {
    school: 'STI College Cebu',
    degree: 'Tech-Voc in Information Communication Technology',
    period: '2017 – 2019',
    location: 'Cebu City',
    color: 'bg-cyan-500',
  },
  {
    school: 'Mandaue City Comprehensive National High School',
    degree: 'Tech-Voc in Computer System Servicing',
    period: '2013 – 2017',
    location: 'Mandaue City',
    color: 'bg-emerald-500',
  },
];

const Education = () => {
  return (
    <div id="education" className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-5xl mx-auto px-4 pt-[6rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGraduationCap className="text-pink-500 text-3xl" />
            <h2 className="text-4xl font-bold">Education</h2>
          </div>
          <p className="text-gray-400">My academic journey</p>
        </motion.div>

        {/* Education Cards */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-8 top-0 h-full w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 via-blue-500 via-cyan-500 to-emerald-500" />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-6 w-5 h-5 ${edu.color} rounded-full border-4 border-gray-900 z-10`} />

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 shadow-lg hover:shadow-pink-500/5"
                >
                  <h3 className="text-lg font-bold text-white mb-1">{edu.school}</h3>
                  <p className="text-pink-400 text-sm font-medium mb-3">{edu.degree}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-gray-500" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-gray-500" />
                      {edu.location}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
