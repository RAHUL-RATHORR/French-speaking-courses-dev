-- Update Course model to add new fields for dynamic content
ALTER TABLE "public"."Course" ADD COLUMN "offerEndDate" TIMESTAMP(3);
ALTER TABLE "public"."Course" ADD COLUMN "promotionBannerText" TEXT;
ALTER TABLE "public"."Course" ADD COLUMN "startDate" TIMESTAMP(3);
ALTER TABLE "public"."Course" ADD COLUMN "batches" JSONB;
ALTER TABLE "public"."Course" ADD COLUMN "requirements" JSONB;
ALTER TABLE "public"."Course" ADD COLUMN "metaTitle" TEXT;
ALTER TABLE "public"."Course" ADD COLUMN "metaDescription" TEXT;
ALTER TABLE "public"."Course" ADD COLUMN "ctaText" TEXT;
ALTER TABLE "public"."Course" ADD COLUMN "timings" JSONB;
