import { useState } from 'react';
import { FaCheck, FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaRegCopy, FaTwitter } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import Reveal from '@/components/ui/Reveal';
import Section from '@/components/ui/Section';
import { site } from '@/data/site';

const socials = [
  { label: 'GitHub', href: site.github, icon: FaGithub },
  { label: 'LinkedIn', href: site.linkedin, icon: FaLinkedin },
  { label: 'X', href: site.twitter, icon: FaTwitter },
];

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
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

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

  const methods = (
    <div className="space-y-3">
      <div className="card flex items-center justify-between gap-3 p-4">
        <a href={`mailto:${site.email}`} className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-300">
            <FaEnvelope aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="eyebrow block">Email</span>
            <span className="block truncate text-sm text-white group-hover:text-pink-200">{site.email}</span>
          </span>
        </a>
        <button
          type="button"
          onClick={copyEmail}
          title={copied ? 'Copied' : 'Copy email'}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-sm text-muted transition-colors hover:border-pink-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
        >
          {copied ? <FaCheck aria-hidden="true" className="text-emerald-400" /> : <FaRegCopy aria-hidden="true" />}
          <span className="sr-only">{copied ? 'Copied' : 'Copy email'}</span>
        </button>
      </div>
      <span className="sr-only" role="status">
        {copied ? 'Email address copied' : ''}
      </span>

      <a href={site.phoneHref} className="card group flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-300">
          <FaPhone aria-hidden="true" />
        </span>
        <span>
          <span className="eyebrow block">Phone</span>
          <span className="block text-sm text-white group-hover:text-pink-200">{site.phoneDisplay}</span>
        </span>
      </a>

      <ul className="flex gap-3 pt-2">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-lg text-muted transition-colors hover:border-pink-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
            >
              <social.icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Section
      id="contact"
      index={7}
      label="contact"
      title="Let's work together"
      highlight="together"
      description={
        <>
          Tell me about the product, the deadline, and what done looks like. I take freelance work and full-time
          roles. <span className="text-white">{site.replyTime}</span>
        </>
      }
      aside={methods}
      layout="split"
    >
      <Reveal>
        <form onSubmit={handleSubmit} className="card relative space-y-5 p-6 sm:p-8">
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

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="eyebrow mb-2 block">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                placeholder="Your name"
                className="field"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow mb-2 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@company.com"
                className="field"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="eyebrow mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="What are you building?"
              className="field resize-y"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>
            {loading ? 'Sending...' : 'Send message'}
          </button>
          {status && (
            <p
              className={`text-center text-sm ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}
              role={status === 'error' ? 'alert' : 'status'}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </Reveal>
    </Section>
  );
};

export default Contact;
