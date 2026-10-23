import Reveal from '@/components/ui/Reveal';
import Section from '@/components/ui/Section';
import AboutMe from './AboutMe';
import Skills from './Skills';

const About = () => (
  <Section id="about" index={1} label="about" title="A developer who ships" highlight="ships" layout="split">
    <div className="space-y-14">
      <Reveal>
        <AboutMe />
      </Reveal>
      <Reveal>
        <h3 className="mb-4 font-display text-2xl font-semibold text-white">Tech stack</h3>
        <Skills />
      </Reveal>
    </div>
  </Section>
);

export default About;
