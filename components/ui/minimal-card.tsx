import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Project } from '@/types';

type MinimalCardProps = Pick<Project, 'id' | 'tags' | 'link' | 'imageUrl'>;

export const MinimalCard = ({ id, imageUrl, link }: MinimalCardProps) => {
  const { t } = useLanguage();
  const title = String(t(`projects.items.${id}.title`));
  const description = String(t(`projects.items.${id}.description`));
  const rawTags = t(`projects.items.${id}.tags`);
  const localizedTags = Array.isArray(rawTags) ? rawTags : [];

  const content = (
    <div className="project-card group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="project-card-title text-lg font-bold tracking-tight">{title}</h3>
        <p className="project-card-description text-xs leading-6">{description}</p>
        {localizedTags && localizedTags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {localizedTags.map((tag) => (
              <span
                key={tag}
                className="project-card-tag rounded-md px-2 py-1 text-[10px] font-medium transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};
