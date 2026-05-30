/**
 * Format a date string into a more readable format
 * @param dateString - A valid date string
 * @returns A formatted date string (e.g., "January 1, 2025")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Creates a URL-friendly slug from a string
 * @param text - The string to convert to a slug
 * @returns A URL-friendly slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

/**
 * Calculate read time based on word count
 * @param content - The content to calculate read time for
 * @returns A string representing the estimated read time
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - The maximum length before truncation
 * @returns The truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Ensures a price-like value is displayed with a rupee symbol.
 * - Leaves non-numeric labels like "Free" untouched.
 * - Converts "INR 299" / "Rs 299" / "299" -> "₹299".
 * - Avoids double-prefixing if "₹" is already present.
 */
export function formatRupee(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return '';
    return `₹${value}`;
  }

  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.includes('₹')) return trimmed;

  const inrMatch = trimmed.match(/^inr\s*(.*)$/i);
  if (inrMatch?.[1]) return `₹${inrMatch[1].trim()}`;

  const rsMatch = trimmed.match(/^rs\.?\s*(.*)$/i);
  if (rsMatch?.[1]) return `₹${rsMatch[1].trim()}`;

  if (/^[0-9][0-9.,]*$/.test(trimmed)) return `₹${trimmed}`;

  return trimmed;
}

/**
 * Extracts a numeric price from a value like "₹2,999" / "INR 299" / "299".
 * Returns 0 when parsing fails.
 */
/**
 * Ensures all anchor tags in HTML open in a new tab (for admin rich-text content).
 */
export function openLinksInNewTab(html: string): string {
  if (!html) return "";

  return html.replace(/<a\b([^>]*)>/gi, (_, attrs: string) => {
    let next = attrs;

    if (/\btarget\s*=/i.test(next)) {
      next = next.replace(/\btarget\s*=\s*(['"])?[^'">\s]*\1?/i, 'target="_blank"');
    } else {
      next += ' target="_blank"';
    }

    if (/\brel\s*=/i.test(next)) {
      if (!/noopener/i.test(next)) {
        next = next.replace(
          /\brel\s*=\s*(['"])([^'"]*)\1/i,
          (_m, quote: string, rel: string) => `rel=${quote}${rel} noopener noreferrer${quote}`
        );
      }
    } else {
      next += ' rel="noopener noreferrer"';
    }

    return `<a${next}>`;
  });
}

export function parsePriceNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

  const numericString = value.replace(/[^\d.,]/g, '');
  const cleanedString = numericString.replace(/,/g, '');
  const parsed = parseFloat(cleanedString);
  return Number.isNaN(parsed) ? 0 : parsed;
}
