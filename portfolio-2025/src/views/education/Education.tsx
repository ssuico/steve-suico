import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';

const education = [
  {
    school: 'University of Southern Philippines Foundation',
    degree: 'Bachelor of Science in Information Technology',
    period: '2021 – 2023',
    location: 'Cebu City',
    earlier: false,
  },
  {
    school: 'STI College Cebu',
    degree: 'Bachelor of Science in Information Technology',
    period: '2020 – 2021',
    location: 'Cebu City',
    earlier: false,
  },
  {
    school: 'Cebu Institute of Technology University',
    degree: 'Bachelor of Science in Information Technology',
    period: '2019 – 2020',
    location: 'Cebu City',
    earlier: false,
  },
  {
    school: 'STI College Cebu',
    degree: 'Tech-Voc in Information Communication Technology',
    period: '2017 – 2019',
    location: 'Cebu City',
    earlier: true,
  },
  {
    school: 'Mandaue City Comprehensive National High School',
    degree: 'Tech-Voc in Computer System Servicing',
    period: '2013 – 2017',
    location: 'Mandaue City',
    earlier: true,
  },
];

const EducationCard = ({
  school,
  degree,
  period,
  location,
}: {
  school: string;
  degree: string;
  period: string;
  location: string;
}) => (
  <article className="rounded-xl border border-gray-700/50 bg-gray-800/60 p-5">
    <h3 className="text-lg font-bold text-white">{school}</h3>
    <p className="mt-1 text-sm font-medium text-pink-400">{degree}</p>
    <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
      <span className="flex items-center gap-1.5">
        <FaCalendarAlt className="text-gray-500" aria-hidden="true" />
        {period}
      </span>
      <span className="flex items-center gap-1.5">
        <FaMapMarkerAlt className="text-gray-500" aria-hidden="true" />
        {location}
      </span>
    </div>
  </article>
);

const Education = () => {
  const [showEarlier, setShowEarlier] = useState(false);
  const degrees = education.filter((item) => !item.earlier);
  const earlier = education.filter((item) => item.earlier);

  return (
    <section id="education" className="scroll-mt-20 w-full bg-gradient-to-b from-black to-gray-900 py-20 text-white">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <FaGraduationCap className="text-3xl text-pink-500" aria-hidden="true" />
            <h2 className="text-4xl font-bold">Education</h2>
          </div>
          <p className="text-gray-300">Information Technology, studied in Cebu.</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {degrees.map((item) => (
            <EducationCard
              key={`${item.school}-${item.period}`}
              school={item.school}
              degree={item.degree}
              period={item.period}
              location={item.location}
            />
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowEarlier((open) => !open)}
            aria-expanded={showEarlier}
            className="text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors"
          >
            {showEarlier ? 'Hide earlier education' : 'Show earlier education'}
          </button>
          {showEarlier && (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {earlier.map((item) => (
                <EducationCard
                  key={`${item.school}-${item.period}`}
                  school={item.school}
                  degree={item.degree}
                  period={item.period}
                  location={item.location}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
