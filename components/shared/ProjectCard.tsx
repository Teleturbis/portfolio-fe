'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <Card className='hover:border-primary hover:shadow-primary/20 h-full overflow-hidden border-2 transition-all duration-300 hover:shadow-xl'>
        <div className='relative aspect-video overflow-hidden'>
          <ImageWithFallback
            src={image}
            alt={title}
            className='h-full w-full object-cover'
            width={500}
            height={500}
          />
        </div>
        <div className='p-6'>
          <h3 className='mb-3'>{title}</h3>
          <p className='text-muted-foreground mb-4'>{description}</p>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Badge
                key={tag}
                className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
