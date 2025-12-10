// =============================================================================
// Blog Types
// =============================================================================
export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content?: string;
  image?: string;
  readTime?: number;
  tags?: string[];
}

// =============================================================================
// Project Types
// =============================================================================
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  imageUrl?: string;
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
