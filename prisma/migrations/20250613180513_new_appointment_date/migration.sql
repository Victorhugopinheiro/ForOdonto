/*
  Warnings:

  - Changed the type of `appointmentDate` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointmentDate",
ADD COLUMN     "appointmentDate" TIMESTAMP(3) NOT NULL;
