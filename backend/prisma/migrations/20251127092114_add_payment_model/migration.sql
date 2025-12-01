-- CreateEnum
CREATE TYPE "PaymentResult" AS ENUM ('SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "payment_status" "PaymentResult" NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "payments"("order_id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
