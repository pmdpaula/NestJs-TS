-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "boughtDate" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "recipeItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recipeItem" ADD CONSTRAINT "recipeItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
