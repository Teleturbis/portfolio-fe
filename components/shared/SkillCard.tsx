'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SkillModal } from './SkillModal';
import { useTranslations } from 'next-intl';

interface SkillCardProps {
  name: string;
  icon: LucideIcon;
  highlights: string[];
  items: string[];
  index: number;
}

export function SkillCard({
  name,
  icon: Icon,
  highlights,
  items,
  index,
}: SkillCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardId = `skill-card-${index}`;

  const t = useTranslations('Skills');

  return (
    <>
      {!isModalOpen && (
        <motion.div
          layoutId={cardId}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: 'spring', damping: 17, stiffness: 300 }}
          className='h-full cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          <Card className='border-border hover:border-primary group hover:shadow-primary/20 h-full overflow-hidden transition-all duration-300 hover:shadow-xl'>
            <div className='p-6'>
              <div className='bg-primary/10 group-hover:bg-primary/20 mb-4 inline-flex rounded-lg p-3 transition-colors'>
                <Icon className='text-primary h-6 w-6' />
              </div>
              <h3 className='mb-3 text-xl font-bold'>{name}</h3>
              <ul className='text-muted-foreground space-y-2 text-sm'>
                {highlights.map(
                  (item, itemIndex) =>
                    itemIndex < 3 && (
                      <li key={itemIndex} className='flex items-center gap-2'>
                        <span className='bg-primary h-1.5 w-1.5 rounded-full' />
                        {item}
                      </li>
                    )
                )}
                <li className='flex items-center gap-2 hover:underline'>
                  <span className='bg-primary h-1.5 w-1.5 rounded-full' />
                  {t('more')}
                </li>
              </ul>
            </div>
          </Card>
        </motion.div>
      )}

      <SkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        icon={Icon}
        items={items}
        layoutId={cardId}
      />
    </>
  );
}
