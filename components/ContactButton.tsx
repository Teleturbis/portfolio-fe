'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ContactButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  // external state flags
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  // labels
  labelDefault?: string;
  labelLoading?: string;
  labelSuccess?: string;
  labelError?: string;
  // behavior
  autoResetDelay?: number; // ms, reset visuals after result
  onAutoReset?: () => void; // optional callback after auto reset
};

const ROTATE_MS = 600;
const EXIT_MS = 700;

export default function ContactButton({
  type = 'button',
  className,
  disabled,
  onClick,
  isLoading = false,
  isSuccess = false,
  isError = false,
  labelDefault = 'Send Message',
  labelLoading = 'Sending…',
  labelSuccess = 'Sent!',
  labelError = 'Failed',
  autoResetDelay = 1200,
  onAutoReset,
}: ContactButtonProps) {
  // visual state: "default" | "loading" | "result"
  const [visual, setVisual] = useState<'default' | 'loading' | 'result'>(
    'default'
  );

  // Drive visual from external flags
  useEffect(() => {
    if (isLoading) {
      setVisual('loading');
    } else if (isSuccess || isError) {
      setVisual('result');
    } else {
      setVisual('default');
    }
  }, [isLoading, isSuccess, isError]);

  // Auto reset visuals after result animation
  useEffect(() => {
    if (visual === 'result') {
      const t = setTimeout(() => {
        setVisual('default');
        onAutoReset?.();
      }, autoResetDelay);
      return () => clearTimeout(t);
    }
  }, [visual, autoResetDelay, onAutoReset]);

  const isInteractiveDisabled = disabled || isLoading;
  const showSuccess = !isLoading && isSuccess;
  const showError = !isLoading && isError;

  const currentLabel = showSuccess
    ? labelSuccess
    : showError
      ? labelError
      : isLoading
        ? labelLoading
        : labelDefault;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cn(
        'group bg-primary text-primary-foreground relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-md px-4 transition-all hover:scale-105 disabled:opacity-50',
        className
      )}
      // disabled={isInteractiveDisabled}
      whileTap={!isInteractiveDisabled ? { scale: 0.98 } : undefined}
    >
      <div className='relative z-10 flex items-center justify-center gap-2'>
        {/* Text */}
        <AnimatePresence mode='wait'>
          <motion.span
            key={currentLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className='select-none'
          >
            {currentLabel}{' '}
            {isLoading &&
              [1, 2, 3].map((dot) => (
                <motion.span
                  key={dot}
                  className='inline-block'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: dot * (ROTATE_MS / 1000) * 0.3,
                    duration: ROTATE_MS / 1000,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                >
                  .
                </motion.span>
              ))}
          </motion.span>
        </AnimatePresence>

        {/* Plane/Icon */}
        <div className='relative flex h-5 w-5 items-center justify-center'>
          <AnimatePresence mode='wait'>
            {visual === 'default' && (
              <motion.div
                key='plane-idle'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, rotate: 45 }}
              >
                <Send className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </motion.div>
            )}

            {visual === 'loading' && (
              <motion.div
                key='plane-wobble'
                initial={{ opacity: 0, rotate: 45 }}
                animate={{
                  opacity: 1,
                  rotate: 45,
                  y: [0, -2, 2, 0],
                }}
                exit={{
                  x: '1500%',
                  y: -10,
                  rotate: 45,
                  opacity: 0,
                  transition: { duration: EXIT_MS / 1000, ease: 'easeIn' },
                }}
                transition={{
                  opacity: { duration: 0.2 },
                  y: {
                    duration: 1.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop',
                  },
                }}
              >
                <Send className='h-5 w-5' />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay success/error icon (static) */}
          <AnimatePresence mode='wait'>
            {showSuccess && !['loading', 'default'].includes(visual) && (
              <motion.div
                key='icon-success'
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: EXIT_MS / 1000 }}
                exit={{ opacity: 0 }}
                className='absolute'
              >
                <CheckCircle2 className='h-5 w-5' />
              </motion.div>
            )}
            {showError && !['loading', 'default'].includes(visual) && (
              <motion.div
                key='icon-error'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className='absolute'
              >
                <AlertCircle className='h-5 w-5' />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  );
}
