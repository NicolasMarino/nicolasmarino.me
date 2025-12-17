'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import type { Project } from '@/types';
export const ProjectCard3D = ({ title, description, imageUrl, link, tags }: Project) => {
  return (
    <CardContainer className="inter-var w-full h-full" containerClassName="py-0 h-full">
      <CardBody className="bg-background relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border transition-colors duration-200 flex flex-col justify-between">
        <CardItem translateZ="50" className="text-xl font-bold text-foreground">
          {title}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-muted-foreground text-sm max-w-sm mt-2">
          {description}
        </CardItem>
        {imageUrl && (
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={imageUrl}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={title}
            />
          </CardItem>
        )}
        <div className="flex justify-between items-center mt-8">
          {tags && (
            <CardItem translateZ={20} className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </CardItem>
          )}

          {link && (
            <CardItem
              translateZ={20}
              as={Link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-colors"
            >
              Visit →
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
};
