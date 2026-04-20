/*
  Warnings:

  - Added the required column `longDescription` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Course" ADD COLUMN     "access" TEXT,
ADD COLUMN     "benefits" JSONB,
ADD COLUMN     "certificate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "companies" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "faq" JSONB,
ADD COLUMN     "features" JSONB,
ADD COLUMN     "instructor" TEXT,
ADD COLUMN     "instructorBio" TEXT,
ADD COLUMN     "instructorExperience" TEXT,
ADD COLUMN     "instructorImage" TEXT,
ADD COLUMN     "instructorSpecialties" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "language" TEXT,
ADD COLUMN     "lessons" INTEGER,
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "modules" JSONB,
ADD COLUMN     "outcomes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "projects" JSONB,
ADD COLUMN     "testimonials" JSONB,
ADD COLUMN     "tools" TEXT[] DEFAULT ARRAY[]::TEXT[];
