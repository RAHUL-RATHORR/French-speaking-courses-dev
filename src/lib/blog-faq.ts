export interface BlogFAQItem {
  question: string;
  answer: string;
}

export function normalizeBlogFaqs(input: unknown): BlogFAQItem[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter(
      (item): item is BlogFAQItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as BlogFAQItem).question === "string"
    )
    .map((item) => ({
      question: item.question.trim(),
      answer: typeof item.answer === "string" ? item.answer : "",
    }))
    .filter((item) => item.question.length > 0);
}

export function parseBlogFaqs(input: unknown): BlogFAQItem[] {
  return normalizeBlogFaqs(input);
}
