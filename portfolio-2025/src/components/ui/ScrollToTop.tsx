import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiArrowCursor } from 'react-icons/gi';
import { TbPlayerSkipBackFilled } from 'react-icons/tb';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-btn"
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          {/* Outer glow ring */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.15, 1] : 1,
              opacity: isHovered ? [0.6, 1, 0.6] : 0.4,
            }}
            transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-lg bg-pink-500 blur-md"
          />

          {/* Scanline shimmer overlay */}
          <motion.div
            animate={{ backgroundPositionY: isHovered ? ['0%', '100%'] : '0%' }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
            className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)',
              backgroundSize: '100% 8px',
            }}
          />

          {/* Button body */}
          <div
            className="relative flex flex-col items-center justify-center cursor-pointer w-14 h-14 rounded-lg border-2 border-pink-500 bg-gray-900/90 backdrop-blur-sm overflow-hidden"
            style={{
              boxShadow: isHovered
                ? '0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(236, 72, 153, 0.4), inset 0 0 15px rgba(236, 72, 153, 0.15)'
                : '0 0 10px rgba(236, 72, 153, 0.4), inset 0 0 8px rgba(236, 72, 153, 0.08)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* D-pad up icon */}
            <motion.div
              animate={{ y: isHovered ? [-2, 2, -2] : 0 }}
              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
              className="text-pink-400 group-hover:text-pink-300 transition-colors"
            >
              <TbPlayerSkipBackFilled
                size={22}
                style={{ transform: 'rotate(90deg)' }}
              />
            </motion.div>

            {/* "TOP" label */}
            <span
              className="text-[9px] font-bold tracking-widest uppercase text-pink-500 group-hover:text-pink-300 transition-colors leading-none mt-0.5"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              TOP
            </span>
          </div>

          {/* Corner pixel accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-pink-400 rounded-tl" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-pink-400 rounded-tr" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-pink-400 rounded-bl" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-pink-400 rounded-br" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
