import Hero from '@/components/hero';
import About from '@/components/about';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import TechIcons from '@/components/tech-icons';
import BlogPreview from '@/components/blog-preview';
import { getAllPosts } from '@/lib/blog';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        paddingBottom: '8rem',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 1.5rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <Hero />
        <div style={{ marginTop: '2rem' }}>
          <TechIcons />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <About />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <Projects />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <BlogPreview posts={posts} />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <Contact />
        </div>
      </div>
    </main>
  );
}
