import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Reveal from '@/components/ui/Reveal';
import Section from '@/components/ui/Section';
import TimelineRow from '@/components/ui/TimelineRow';

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

type Entry = (typeof education)[number];

const EducationRow = ({ item }: { item: Entry }) => (
  <TimelineRow period={item.period}>
    <h3 className="text-lg font-semibold text-white">{item.school}</h3>
    <p className="text-sm font-medium text-pink-300">{item.degree}</p>
    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
      <FaMapMarkerAlt aria-hidden="true" />
      {item.location}
    </p>
  </TimelineRow>
);

const Education = () => {
  const [showEarlier, setShowEarlier] = useState(false);
  const degrees = education.filter((item) => !item.earlier);
  const earlier = education.filter((item) => item.earlier);

  return (
    <Section
      id="education"
      index={5}
      label="education"
      title="Where I studied"
      highlight="studied"
      description="Information Technology, studied in Cebu."
      layout="split"
    >
      <Reveal>
        <ul className="focus-list">
          {degrees.map((item) => (
            <EducationRow key={`${item.school}-${item.period}`} item={item} />
          ))}
          {showEarlier &&
            earlier.map((item) => <EducationRow key={`${item.school}-${item.period}`} item={item} />)}
        </ul>
        <button
          type="button"
          onClick={() => setShowEarlier((open) => !open)}
          aria-expanded={showEarlier}
          className="mt-3 text-sm font-medium text-pink-300 transition-colors hover:text-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
        >
          {showEarlier ? 'Hide earlier education' : 'Show earlier education'}
        </button>
      </Reveal>
    </Section>
  );
};

export default Education;
