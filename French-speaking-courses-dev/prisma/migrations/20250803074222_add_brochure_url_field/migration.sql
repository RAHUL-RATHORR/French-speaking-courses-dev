-- AlterEnum
ALTER TYPE "public"."QueryType" ADD VALUE 'NEWSLETTER';

-- AlterTable
ALTER TABLE "public"."Course" ADD COLUMN     "brochureUrl" TEXT;
