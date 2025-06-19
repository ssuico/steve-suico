import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import meAvatar from '../../assets/meNeonBg.png';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} id="home" className="h-screen w-full relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Floating Elements */}
        <motion.div
          style={{ y }}
          className="absolute inset-0"
        >
          {/* Tech-themed SVG elements */}
          <svg className="absolute top-20 left-10 w-24 h-24 text-pink-500/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <svg className="absolute bottom-20 right-10 w-32 h-32 text-pink-500/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center text-white px-4 gap-8">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-[40%] flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full transform scale-110" />
            <img 
              src={meAvatar} 
              alt="Steve Suico" 
              className="w-[300px] h-[400px] object-cover rounded-xl relative z-10"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left w-full md:w-[60%]"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Steve <span className="text-pink-500">Suico</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Full Stack Developer
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center md:justify-start gap-6 mb-12">
            <motion.a
              href="https://github.com/ssuico"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-2xl text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/steve-suico-97454a276/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-2xl text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://x.com/Steve46168146"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-2xl text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter />
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-1 h-2 bg-gray-400 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;