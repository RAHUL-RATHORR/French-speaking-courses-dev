-- CreateEnum
CREATE TYPE "public"."BlogCategory" AS ENUM ('CULTURE', 'LEARNING', 'GRAMMAR', 'VOCABULARY', 'TRAVEL');

-- AlterTable
ALTER TABLE "public"."BlogPost" ADD COLUMN     "category" "public"."BlogCategory" NOT NULL DEFAULT 'LEARNING';
