import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin reading-progress line along the top edge of the viewport. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-pink-500 via-fuchsia-400 to-cyan-300"
    />
  );
};

export default ScrollProgress;
