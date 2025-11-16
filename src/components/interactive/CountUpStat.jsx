import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CountUpStat = ({ end, duration = 2000, prefix = '', suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = Date.now();
          const endValue = typeof end === 'string' ? parseFloat(end.replace(/,/g, '')) : end;

          const timer = setInterval(() => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuad = (t) => t * (2 - t);
            const currentCount = Math.floor(easeOutQuad(progress) * endValue);

            setCount(currentCount);

            if (progress === 1) {
              clearInterval(timer);
              setCount(endValue);
            }
          }, 16); // ~60fps

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-gator-green-dark mb-2">
        {prefix}{formatNumber(count)}{suffix}
      </div>
      <div className="text-gray-600 text-lg">{label}</div>
    </motion.div>
  );
};

export default CountUpStat;
