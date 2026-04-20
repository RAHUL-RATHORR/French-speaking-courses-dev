import type { BlogPost } from './blog-data';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  rating: number;
  students: number;
  instructor: string;
  instructorImage?: string;
  instructorBio?: string;
  image: string;
}

export function generateBlogPostStructuredData(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post?.image,
    'publisher': {
      '@type': 'Organization',
      'name': 'French Skill Academy',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.frenchskill.com/french-skill.png' // Replace with your actual logo URL
      }
    },
    'datePublished': post.date,
    'keywords': post.tags.join(', ')
  };
}

export function generateBlogListingStructuredData(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': posts.map((post, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'BlogPosting',
        'headline': post.title,
        'url': `/blog/${post.slug}`,
        'datePublished': post.date
      }
    }))
  };
}

export function generateCourseStructuredData(course: Course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': course.title,
    'description': course.description,
    'provider': {
      '@type': 'Organization',
      'name': 'French Skill Academy',
      'sameAs': 'https://www.frenchskill.com'
    },
    'offers': {
      '@type': 'Offer',
      'price': course.price.replace('₹', ''),
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': course.rating,
      'ratingCount': course.students,
      'bestRating': '5',
      'worstRating': '1'
    },
    'audience': {
      '@type': 'Audience',
      'audienceType': `${course.level} French language learners`
    },
    'hasCourseInstance': {
      '@type': 'CourseInstance',
      'courseMode': 'online',
      'courseWorkload': `${course.duration} study time`,
      'instructor': {
        '@type': 'Person',
        'name': course.instructor
      }
    },
    'image': course?.image,
    'url': `https://www.frenchskill.com/course/${course.slug}`
  };
}

export function generateCoursesListingStructuredData(courses: Course[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': courses.map((course, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Course',
        'name': course.title,
        'description': course.description,
        'url': `/course/${course.slug}`
      }
    }))
  };
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item?.name,
      'item': item.url
    }))
  };
}
