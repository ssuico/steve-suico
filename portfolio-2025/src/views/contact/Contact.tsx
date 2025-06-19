import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID!,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
    )
    .then(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setLoading(false); // Stop loading
    })
    .catch(() => {
      setStatus('Failed to send message. Please try again later.');
      setLoading(false); // Stop loading
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="contact" className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4 pt-[10rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400">Let's create something amazing together</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-gray-400">
              Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects and ideas.
            </p>
            
            <div className="flex space-x-6">
              <motion.a
                href="https://github.com/ssuico"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-2xl text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/steve-bryan-suico-97454a276/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-2xl text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://x.com/Steve46168146"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-2xl text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter />
              </motion.a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
            {status && (
              <div className="text-center mt-4 text-sm text-green-400">{status}</div>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;