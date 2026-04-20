import Image from 'next/image';
import Link from '@/components/ui/Link';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  image,
  category,
  date,
  readTime
}: BlogCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'culture':
        return 'bg-purple-500 text-white';
      case 'learning':
        return 'bg-blue-500 text-white';
      case 'grammar':
        return 'bg-yellow-500 text-black';
      case 'vocabulary':
        return 'bg-green-500 text-white';
      case 'travel':
        return 'bg-indigo-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card variant="hover">
      <Link href={`/blog/${slug}`} variant="default" className="block">
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`${getCategoryColor(category)} px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
              {category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
            <time dateTime={date}>{formatDate(date)}</time>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-french-blue transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          
          <div className="mt-4 inline-flex items-center font-medium text-french-blue">
            Read more
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </Card>
  );
}
