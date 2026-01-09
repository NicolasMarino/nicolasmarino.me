import Hero from '@/components/hero';
import About from '@/components/about';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import TechIcons from '@/components/tech-icons';
import BlogPreview from '@/components/blog/preview';
import { getAllPosts } from '@/lib/blog';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen text-foreground pb-20">
      <div className="mx-auto max-w-[800px] px-6 py-8 notebook-card">
        <Hero />
        <div className="mt-8">
          <TechIcons />
        </div>
        <div className="mt-20">
          <About />
        </div>
        <div className="mt-20">
          <Experience />
        </div>
        <div className="mt-20">
          <Projects />
        </div>
        <div className="mt-20">
          <BlogPreview posts={posts} />
        </div>
        <div className="mt-20">
          <Contact />
        </div>
      </div>
    </main>
  );
}
