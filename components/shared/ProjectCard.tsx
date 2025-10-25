'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import Link from 'next/link';
import { ArrowUpRightSquare } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  links?: {
    [key: string]: {
      label: string;
      url: string;
    };
  };
  employer?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  links,
  type,
  employer,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className='h-full'
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
        <div className='flex h-full flex-col justify-between p-6'>
          <div>
            <h3 className='mb-2'>{title}</h3>
            <Badge className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground mb-4'>
              {type}
            </Badge>
            {employer && (
              <p className='text-muted-foreground mb-4 text-sm font-semibold'>
                {employer}
              </p>
            )}
            <p className='text-muted-foreground mb-4'>{description}</p>
            {links && (
              <div className='my-4 flex flex-wrap gap-4'>
                {Object.entries(links).map(([_key, { label, url }]) => (
                  <Link
                    key={label}
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary bg-primary/10 hover:bg-primary/20 flex items-center rounded-md px-3 py-1 text-xs transition-colors hover:underline'
                  >
                    {label}{' '}
                    <ArrowUpRightSquare
                      size={16}
                      className='ml-1 inline-block'
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
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
