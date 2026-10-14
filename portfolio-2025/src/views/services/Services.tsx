import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCloud, FaCogs, FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { services } from '@/data/services';
import type { ServiceId } from '@/data/services';

const icons: Record<ServiceId, IconType> = {
  web: FaLaptopCode,
  data: FaProjectDiagram,
  cloud: FaCloud,
  automation: FaCogs,
};

const Services = () => {
  return (
    <section id="services" className="scroll-mt-20 w-full bg-gradient-to-b from-gray-900 to-black py-20 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Services</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Practical builds for teams that need software in production, not a slide deck.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.id];
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col rounded-xl border border-gray-700/50 bg-gray-800/60 p-6"
              >
                <Icon className="text-2xl text-pink-400" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{service.pitch}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-300">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors"
                >
                  Start a conversation
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
