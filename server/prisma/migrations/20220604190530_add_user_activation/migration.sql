/*
  Warnings:

  - Added the required column `activationLink` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "activationLink" TEXT NOT NULL,
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false;
