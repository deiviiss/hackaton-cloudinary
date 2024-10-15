/*
  Warnings:

  - You are about to drop the column `caption_generated` on the `users_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_images" DROP COLUMN "caption_generated";

-- AlterTable
ALTER TABLE "users_images_results" ADD COLUMN     "caption_generated" TEXT;
