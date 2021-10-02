-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('FEMALE', 'MALE');

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "genre" "Genre" NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities.name_unique" ON "cities"("name");

-- AddForeignKey
ALTER TABLE "customers" ADD FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
