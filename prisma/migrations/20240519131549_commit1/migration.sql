-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sneaker" (
    "id" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sneaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sneaker_Size" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "sneaker_id" TEXT NOT NULL,

    CONSTRAINT "Sneaker_Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sneaker_Color" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "sneaker_id" TEXT NOT NULL,

    CONSTRAINT "Sneaker_Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sneaker_Image" (
    "id" SERIAL NOT NULL,
    "sneaker_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Sneaker_Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sneaker" ADD CONSTRAINT "Sneaker_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sneaker_Size" ADD CONSTRAINT "Sneaker_Size_sneaker_id_fkey" FOREIGN KEY ("sneaker_id") REFERENCES "Sneaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sneaker_Color" ADD CONSTRAINT "Sneaker_Color_sneaker_id_fkey" FOREIGN KEY ("sneaker_id") REFERENCES "Sneaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sneaker_Image" ADD CONSTRAINT "Sneaker_Image_sneaker_id_fkey" FOREIGN KEY ("sneaker_id") REFERENCES "Sneaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
