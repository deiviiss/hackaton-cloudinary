/*
  Warnings:

  - You are about to drop the column `high` on the `images_social_types` table. All the data in the column will be lost.
  - Added the required column `height` to the `images_social_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images_social_types" DROP COLUMN "high",
ADD COLUMN     "height" INTEGER NOT NULL;
