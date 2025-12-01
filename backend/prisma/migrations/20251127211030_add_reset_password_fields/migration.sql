-- AlterTable
ALTER TABLE "users" ADD COLUMN     "reset_password_code" TEXT,
ADD COLUMN     "reset_password_code_expires_at" TIMESTAMP(3);
