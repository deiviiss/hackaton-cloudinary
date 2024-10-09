/*
  Warnings:

  - You are about to drop the `ImageSocialType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserImageResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageSocialType" DROP CONSTRAINT "ImageSocialType_socialMediaId_fkey";

-- DropForeignKey
ALTER TABLE "SocialPost" DROP CONSTRAINT "SocialPost_socialMediaId_fkey";

-- DropForeignKey
ALTER TABLE "SocialPost" DROP CONSTRAINT "SocialPost_userImageResultId_fkey";

-- DropForeignKey
ALTER TABLE "UserImage" DROP CONSTRAINT "UserImage_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserImageResult" DROP CONSTRAINT "UserImageResult_userImageId_fkey";

-- DropTable
DROP TABLE "ImageSocialType";

-- DropTable
DROP TABLE "SocialMedia";

-- DropTable
DROP TABLE "SocialPost";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserImage";

-- DropTable
DROP TABLE "UserImageResult";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_images" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_images_results" (
    "id" SERIAL NOT NULL,
    "userImageId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_images_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_posts" (
    "id" SERIAL NOT NULL,
    "userImageResultId" INTEGER NOT NULL,
    "socialMediaId" INTEGER NOT NULL,
    "descriptionPromt" TEXT NOT NULL,
    "descriptionResult" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_social_types" (
    "id" SERIAL NOT NULL,
    "high" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "socialMediaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_social_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_name_key" ON "social_media"("name");

-- AddForeignKey
ALTER TABLE "users_images" ADD CONSTRAINT "users_images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_images_results" ADD CONSTRAINT "users_images_results_userImageId_fkey" FOREIGN KEY ("userImageId") REFERENCES "users_images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_posts" ADD CONSTRAINT "social_posts_userImageResultId_fkey" FOREIGN KEY ("userImageResultId") REFERENCES "users_images_results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_posts" ADD CONSTRAINT "social_posts_socialMediaId_fkey" FOREIGN KEY ("socialMediaId") REFERENCES "social_media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_social_types" ADD CONSTRAINT "images_social_types_socialMediaId_fkey" FOREIGN KEY ("socialMediaId") REFERENCES "social_media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
