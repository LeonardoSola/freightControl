/*
  Warnings:

  - Added the required column `max_weight` to the `Truck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Truck" ADD COLUMN     "max_weight" INTEGER NOT NULL;
