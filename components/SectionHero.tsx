import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SectionHeroProps {
  title: string;
  gradient?: string;
  isDark?: boolean;
}

export function SectionHero({
  title,
  gradient,
  isDark = false,
}: SectionHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const fontSize = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['12rem', '4rem', '2.5rem']
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.8, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    [1, 0.5, 0]
  );

  const defaultGradient = isDark
    ? 'linear-gradient(135deg, rgba(67, 154, 173, 0.2) 0%, rgba(13, 80, 95, 0.3) 50%, rgba(67, 154, 173, 0.15) 100%)'
    : 'linear-gradient(135deg, rgba(67, 154, 173, 0.15) 0%, rgba(13, 80, 95, 0.1) 50%, rgba(67, 154, 173, 0.2) 100%)';

  return (
    <div
      ref={ref}
      className='relative flex min-h-screen items-center justify-center overflow-hidden'
    >
      {/* Animated Background */}
      <motion.div
        className='absolute inset-0 z-0'
        style={{
          background: gradient || defaultGradient,
          opacity: backgroundOpacity,
        }}
      >
        {/* Animated Circles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full'
            style={{
              background:
                'radial-gradient(circle, rgba(67, 154, 173, 0.3) 0%, transparent 70%)',
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Text */}
      <motion.div
        className='relative z-10 px-4 text-center'
        style={{
          y,
          opacity,
          scale,
        }}
      >
        <motion.h2
          style={{
            fontSize,
            lineHeight: 1.1,
          }}
          className='from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text font-extrabold text-transparent drop-shadow-2xl py-8'
        >
          {title}
        </motion.h2>
      </motion.div>

      {/* Gradient Overlay at bottom */}
      <motion.div
        className='from-background absolute right-0 bottom-0 left-0 z-20 h-32 bg-gradient-to-t to-transparent'
        style={{
          opacity: useTransform(scrollYProgress, [0.5, 1], [0, 1]),
        }}
      />
    </div>
  );
}
