-- CreateTable
CREATE TABLE "datasets" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "filesAmount" INTEGER NOT NULL,
    "archiveLink" TEXT NOT NULL,

    CONSTRAINT "datasets_pkey" PRIMARY KEY ("id")
);
