import { memeCoinGuide } from './meme-coin-guide';

export interface BlogPost {
  title: string;
  author: string;
  date: string;
  readingTime: string;
  slug: string;
  coverImage?: string;
  tags: string[];
  externalDocs?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
  sections: Array<{
    type: string;
    content?: string;
    items?: string[] | Array<{ text: string; url: string }>;
    title?: string;
    language?: string;
    filename?: string;
  }>;
}

export const blogPosts: BlogPost[] = [memeCoinGuide];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}; 