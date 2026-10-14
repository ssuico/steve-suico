import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { site } from '@/data/site';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setStatusMessage('');

    if (formData.company.trim()) {
      setStatus('success');
      setStatusMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '', company: '' });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setStatusMessage(`The form is not configured yet. Email me at ${site.email}.`);
      return;
    }

    setLoading(true);
    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey,
      )
      .then(() => {
        setStatus('success');
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '', company: '' });
      })
      .catch(() => {
        setStatus('error');
        setStatusMessage('Failed to send message. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="scroll-mt-20 w-full bg-gradient-to-b from-gray-900 to-black py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">Get In Touch</h2>
          <p className="text-gray-300">Tell me about the product, the deadline, and what done looks like.</p>
          <p className="mt-2 text-sm text-gray-400">{site.replyTime}</p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="mb-6 text-2xl font-semibold">Contact Information</h3>
            <p className="text-gray-300">
              I take freelance work and full-time roles. If you have a web app, a dashboard, or a pipeline that needs an owner, send a note.
            </p>

            <div className="space-y-4">
              <a href={`mailto:${site.email}`} className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-pink-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors group-hover:bg-pink-500/20">
                  <FaEnvelope className="text-pink-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm">{site.email}</p>
                </div>
              </a>
              <a href={site.phoneHref} className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-pink-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors group-hover:bg-pink-500/20">
                  <FaPhone className="text-pink-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm">{site.phoneDisplay}</p>
                </div>
              </a>
            </div>

            <div className="flex space-x-6">
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-2xl text-gray-400 transition-colors hover:text-white">
                <FaGithub />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-2xl text-gray-400 transition-colors hover:text-white">
                <FaLinkedin />
              </a>
              <a href={site.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-2xl text-gray-400 transition-colors hover:text-white">
                <FaTwitter />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="relative space-y-6"
          >
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-pink-500 py-3 font-medium text-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && (
              <p
                className={`text-center text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}
                role={status === 'error' ? 'alert' : 'status'}
              >
                {statusMessage}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
