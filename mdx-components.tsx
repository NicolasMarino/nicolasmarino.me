import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-serif font-bold mb-6 text-foreground mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-serif font-bold mb-4 text-foreground mt-8 border-b border-border pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-serif font-bold mb-3 text-foreground mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="font-serif text-lg leading-relaxed mb-6 text-muted-foreground">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 text-muted-foreground ml-4 font-serif">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 text-muted-foreground ml-4 font-serif">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-lg leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-foreground/20 pl-4 italic my-6 bg-muted p-4 rounded-r-lg text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm text-foreground">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-foreground text-background p-4 rounded-lg overflow-x-auto mb-6 shadow-lg">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-foreground hover:text-foreground/80 underline decoration-foreground/30 hover:decoration-foreground/100 transition-all"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    ...components,
  };
}
