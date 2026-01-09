export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content?: string;
  image?: string;
  readTime?: number;
  tags?: string[];
  language?: 'es' | 'en';
}

// =============================================================================
// Project Types
// =============================================================================
export interface Project {
  id: string;
  tags: string[];
  link?: string;
  imageUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  period: string;
  tags: string[];
}

// =============================================================================
// Tech Stack Types
// =============================================================================
export interface TechItem {
  name: string;
  icon: string;
}

// =============================================================================
// Navigation Types
// =============================================================================
export interface NavItem {
  href: string;
  labelKey: string;
  external?: boolean;
}

// =============================================================================
// Component Props
// =============================================================================

/**
 * Base props for components that receive a single post
 */
export interface PostProps {
  post: Post;
}

export interface PostGridProps {
  posts: Post[];
}

export interface BlogCardProps extends PostProps {
  priority?: boolean;
  className?: string;
}

export interface DockItemProps {
  href: string;
  label: string;
  external?: boolean;
}
