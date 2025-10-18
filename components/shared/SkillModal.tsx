'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, LucideIcon } from 'lucide-react';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  icon: LucideIcon;
  items: string[];
  layoutId: string;
}

export function SkillModal({
  isOpen,
  onClose,
  name,
  icon: Icon,
  items,
  layoutId,
}: SkillModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ backgroundColor: '#00000099' }}
            className='fixed inset-0 top-0 right-0 bottom-0 left-0 flex items-center justify-center backdrop-blur-sm'
            id='backdrop'
          >
            {/* Modal */}
            <motion.div
              layoutId={layoutId}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className='bg-background border-primary relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl border-2 p-4 shadow-2xl'
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className='absolute top-0 right-0 z-20 p-2'>
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={onClose}
                  className='hover:bg-primary cursor-pointer rounded-full p-2 transition-colors'
                  aria-label='Close modal'
                >
                  <X size={24} className='text-primary-foreground' />
                </motion.button>
              </div>
              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className='flex flex-col gap-6'
              >
                {/* Icon & Title */}
                <div className='flex items-center gap-4'>
                  <div className='bg-primary/10 rounded-xl p-4'>
                    <Icon className='text-primary h-12 w-12' />
                  </div>
                  <h2 className='text-3xl font-bold'>{name}</h2>
                </div>

                {/* Skills List */}
                <div>
                  <h3 className='mb-4 text-lg font-semibold'>
                    Technologien & Tools:
                  </h3>
                  <ul className='grid gap-3 sm:grid-cols-2'>
                    {items.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className='bg-muted hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors'
                      >
                        <span className='bg-primary h-2 w-2 rounded-full' />
                        <span className='font-medium'>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
