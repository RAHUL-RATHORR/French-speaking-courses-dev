-- AlterTable
ALTER TABLE "public"."Course" ADD COLUMN     "batchScheduleSection" JSONB,
ADD COLUMN     "benefitsSection" JSONB,
ADD COLUMN     "comparisonSection" JSONB,
ADD COLUMN     "ctaSections" JSONB,
ADD COLUMN     "curriculumSection" JSONB,
ADD COLUMN     "faqSection" JSONB,
ADD COLUMN     "feesSection" JSONB,
ADD COLUMN     "heroBannerSection" JSONB,
ADD COLUMN     "overviewSection" JSONB,
ADD COLUMN     "projectsSection" JSONB,
ADD COLUMN     "reviewsSection" JSONB,
ADD COLUMN     "skillsToolsSection" JSONB,
ADD COLUMN     "whyEnrollSection" JSONB;
