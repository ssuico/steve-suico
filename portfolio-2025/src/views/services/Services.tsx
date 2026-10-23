import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheck, FaCloud, FaCogs, FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import Reveal from '@/components/ui/Reveal';
import Section from '@/components/ui/Section';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { services } from '@/data/services';
import type { ServiceId } from '@/data/services';

const icons: Record<ServiceId, IconType> = {
  web: FaLaptopCode,
  data: FaProjectDiagram,
  cloud: FaCloud,
  automation: FaCogs,
};

const Services = () => (
  <Section
    id="services"
    index={2}
    label="services"
    title="What I can build for you"
    highlight="build"
    description="Practical builds for teams that need software in production, not a slide deck."
  >
    <div className="grid gap-5 md:grid-cols-2">
      {services.map((service, index) => {
        const Icon = icons[service.id];
        return (
          <Reveal key={service.id} delay={index * 0.06} className="h-full">
            <SpotlightCard className="group flex h-full flex-col p-7">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500/10 text-xl text-pink-300 ring-1 ring-pink-500/20">
                  <Icon aria-hidden="true" />
                </span>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.pitch}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-gray-300">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <FaCheck className="mt-1 shrink-0 text-xs text-pink-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 pt-1 text-sm font-medium text-pink-300 transition-colors hover:text-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
              >
                Start a conversation
                <FaArrowRight
                  className="text-xs transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </div>
  </Section>
);

export default Services;
