/*
  Warnings:

  - Changed the type of `userId` on the `comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dataId` on the `comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "dataId",
ADD COLUMN     "dataId" INTEGER NOT NULL;
