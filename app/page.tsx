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
    <main className="main-page">
      <div className="main-container">
        <Hero />
        <div className="section-spacer-sm">
          <TechIcons />
        </div>
        <div className="section-spacer">
          <About />
        </div>
        <div className="section-spacer">
          <Projects />
        </div>
        <div className="section-spacer">
          <BlogPreview posts={posts} />
        </div>
        <div className="section-spacer">
          <Contact />
        </div>
      </div>
    </main>
  );
}
