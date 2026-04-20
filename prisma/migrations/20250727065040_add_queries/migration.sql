-- CreateEnum
CREATE TYPE "public"."QueryType" AS ENUM ('CONTACT', 'COURSE_INQUIRY');

-- CreateEnum
CREATE TYPE "public"."QueryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED');

-- CreateTable
CREATE TABLE "public"."Query" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "phone" TEXT,
    "type" "public"."QueryType" NOT NULL DEFAULT 'CONTACT',
    "courseId" TEXT,
    "courseTitle" TEXT,
    "status" "public"."QueryStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);
