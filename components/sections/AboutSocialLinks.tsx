'use client';

import { motion } from 'motion/react';
import { Github, Gitlab, Linkedin, Mail } from 'lucide-react';
import Icons from '../svgs/Icons';
import { useState } from 'react';

const links = {
  github: 'https://github.com/Teleturbis',
  gitlab: 'https://gitlab.com/Teleturbis',
  linkedin: 'https://www.linkedin.com/in/poppe-kevin/',
  gulp: 'https://www.gulp.de/gulp2/g/experten/selbststaendige/profile/68da8e6daeb362d1c471c109',
  malt: 'https://www.malt.de/profile/kevinpoppe',
  email: 'mailto:office@kevinpoppe.de',
};

export function AboutSocialLinks() {
  const [isMaltHovered, setIsMaltHovered] = useState(false);
  const [isGulpHovered, setIsGulpHovered] = useState(false);

  return (
    <div className='mt-8 flex gap-4'>
      <motion.a
        href={links.github}
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors'
      >
        <Github size={24} />
      </motion.a>
      <motion.a
        href={links.gitlab}
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors'
      >
        <Gitlab size={24} />
      </motion.a>
      <motion.a
        href={links.malt}
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors'
        onMouseEnter={() => setIsMaltHovered(true)}
        onMouseLeave={() => setIsMaltHovered(false)}
      >
        <Icons
          size={24}
          color={isMaltHovered ? '#fff' : '#439aad'}
          icon='malt'
        />
      </motion.a>
      <motion.a
        href={links.gulp}
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors'
        onMouseEnter={() => setIsGulpHovered(true)}
        onMouseLeave={() => setIsGulpHovered(false)}
      >
        <Icons
          size={24}
          color={isGulpHovered ? '#fff' : '#439aad'}
          icon='gulp'
        />
      </motion.a>
      <motion.a
        href={links.linkedin}
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors'
      >
        <Linkedin size={24} />
      </motion.a>
      <motion.a
        href={links.email}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors'
      >
        <Mail size={24} />
      </motion.a>
    </div>
  );
}
