'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { techStack } from '@/data/tech-stack';

export default function TechIcons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex flex-wrap justify-center gap-8 py-1"
    >
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
          className="relative group flex flex-col items-center"
        >
          <NextImage
            src={tech.icon}
            alt={tech.name}
            width={20}
            height={20}
            className="w-5 h-5 grayscale group-hover:grayscale-0 group-hover:filter-none hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
          />
          <span className="absolute -bottom-6 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
