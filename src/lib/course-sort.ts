type CourseSortInput = {
  title?: string | null;
  slug?: string | null;
  level?: string | null;
};

/** A1 → A2 → B1 → B2 → TCF → TEF → others */
export function getCourseSortOrder(course: CourseSortInput): number {
  const haystack = `${course.title ?? ""} ${course.slug ?? ""} ${course.level ?? ""}`.toLowerCase();

  if (/\btef\b|tef[\s_-]canada/.test(haystack)) return 6;
  if (/\btcf\b|tcf[\s_-]canada/.test(haystack)) return 5;
  if (/\bb2\b|upper\s*intermediate/.test(haystack)) return 4;
  if (/\bb1\b/.test(haystack)) return 3;
  if (/\ba2\b|elementary/.test(haystack)) return 2;
  if (/\ba1\b|beginner/.test(haystack)) return 1;

  if (/intermediate/.test(haystack) && !/upper/.test(haystack)) return 3;
  if (/advanced|upper/.test(haystack)) return 4;

  return 99;
}

export function sortCoursesByLevel<T extends CourseSortInput>(courses: T[]): T[] {
  return [...courses].sort((a, b) => {
    const orderDiff = getCourseSortOrder(a) - getCourseSortOrder(b);
    if (orderDiff !== 0) return orderDiff;
    return (a.title ?? "").localeCompare(b.title ?? "", undefined, { sensitivity: "base" });
  });
}
