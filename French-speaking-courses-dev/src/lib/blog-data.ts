export type BlogCategory = 
  | 'culture' 
  | 'learning' 
  | 'grammar' 
  | 'vocabulary' 
  | 'travel';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: BlogCategory;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  readTime: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
}

// Sample blog posts data
export const blogPosts: BlogPost[] = [];

// Helper function to get blog posts by category
export function getBlogPostsByCategory(category?: BlogCategory): BlogPost[] {
  if (!category) return blogPosts;
  return blogPosts.filter(post => post.category === category);
}

// Helper function to get a single blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get related blog posts based on category and tags
export function getRelatedBlogPosts(currentPost: BlogPost, count: number = 3): BlogPost[] {
  // First try to match by category and tags
  const sameCategoryPosts = blogPosts.filter(post => 
    post.id !== currentPost.id && 
    post.category === currentPost.category
  );
  
  // Sort by number of matching tags
  const sortedPosts = sameCategoryPosts.sort((a, b) => {
    const aMatchingTags = a.tags.filter(tag => currentPost.tags.includes(tag)).length;
    const bMatchingTags = b.tags.filter(tag => currentPost.tags.includes(tag)).length;
    return bMatchingTags - aMatchingTags;
  });
  
  return sortedPosts.slice(0, count);
}

// Get all unique categories
export function getAllCategories(): BlogCategory[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}

// Helper function to generate SEO-friendly description
export function generateSEODescription(content: string, maxLength: number = 160): string {
  // Strip HTML tags
  const plainText = content.replace(/<[^>]+>/g, '');
  
  // Truncate to maxLength and ensure it doesn't cut words
  if (plainText.length <= maxLength) return plainText;
  
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpaceIndex) + '...';
}

// Function to get blog posts by tag
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

// Function to get popular blog categories with count
export function getPopularCategories(limit: number = 5): { category: BlogCategory; count: number }[] {
  const categoryCounts = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<BlogCategory, number>);
  
  return Object.entries(categoryCounts)
    .map(([category, count]) => ({ 
      category: category as BlogCategory, 
      count 
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
