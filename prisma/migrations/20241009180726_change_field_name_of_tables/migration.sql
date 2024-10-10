/*
  Warnings:

  - The primary key for the `images_social_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `images_social_types` table. All the data in the column will be lost.
  - You are about to drop the column `socialMediaId` on the `images_social_types` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `images_social_types` table. All the data in the column will be lost.
  - The primary key for the `social_media` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `social_media` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `social_media` table. All the data in the column will be lost.
  - The primary key for the `social_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `social_posts` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionPromt` on the `social_posts` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionResult` on the `social_posts` table. All the data in the column will be lost.
  - You are about to drop the column `socialMediaId` on the `social_posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `social_posts` table. All the data in the column will be lost.
  - You are about to drop the column `userImageResultId` on the `social_posts` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - The primary key for the `users_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users_images` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users_images` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users_images` table. All the data in the column will be lost.
  - The primary key for the `users_images_results` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users_images_results` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users_images_results` table. All the data in the column will be lost.
  - You are about to drop the column `userImageId` on the `users_images_results` table. All the data in the column will be lost.
  - Added the required column `social_media_id` to the `images_social_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `images_social_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `social_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_promt` to the `social_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_result` to the `social_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_media_id` to the `social_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `social_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_image_result_id` to the `social_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users_images_results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_image_id` to the `users_images_results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images_social_types" DROP CONSTRAINT "images_social_types_socialMediaId_fkey";

-- DropForeignKey
ALTER TABLE "social_posts" DROP CONSTRAINT "social_posts_socialMediaId_fkey";

-- DropForeignKey
ALTER TABLE "social_posts" DROP CONSTRAINT "social_posts_userImageResultId_fkey";

-- DropForeignKey
ALTER TABLE "users_images" DROP CONSTRAINT "users_images_userId_fkey";

-- DropForeignKey
ALTER TABLE "users_images_results" DROP CONSTRAINT "users_images_results_userImageId_fkey";

-- AlterTable
ALTER TABLE "images_social_types" DROP CONSTRAINT "images_social_types_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "socialMediaId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "social_media_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "images_social_types_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "images_social_types_id_seq";

-- AlterTable
ALTER TABLE "social_media" DROP CONSTRAINT "social_media_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "social_media_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "social_media_id_seq";

-- AlterTable
ALTER TABLE "social_posts" DROP CONSTRAINT "social_posts_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "descriptionPromt",
DROP COLUMN "descriptionResult",
DROP COLUMN "socialMediaId",
DROP COLUMN "updatedAt",
DROP COLUMN "userImageResultId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description_promt" TEXT NOT NULL,
ADD COLUMN     "description_result" TEXT NOT NULL,
ADD COLUMN     "social_media_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_image_result_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "social_posts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "social_posts_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AlterTable
ALTER TABLE "users_images" DROP CONSTRAINT "users_images_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_images_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_images_id_seq";

-- AlterTable
ALTER TABLE "users_images_results" DROP CONSTRAINT "users_images_results_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userImageId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_image_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_images_results_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_images_results_id_seq";

-- AddForeignKey
ALTER TABLE "users_images" ADD CONSTRAINT "users_images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_images_results" ADD CONSTRAINT "users_images_results_user_image_id_fkey" FOREIGN KEY ("user_image_id") REFERENCES "users_images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_posts" ADD CONSTRAINT "social_posts_user_image_result_id_fkey" FOREIGN KEY ("user_image_result_id") REFERENCES "users_images_results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_posts" ADD CONSTRAINT "social_posts_social_media_id_fkey" FOREIGN KEY ("social_media_id") REFERENCES "social_media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_social_types" ADD CONSTRAINT "images_social_types_social_media_id_fkey" FOREIGN KEY ("social_media_id") REFERENCES "social_media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
