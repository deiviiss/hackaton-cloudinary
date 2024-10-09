-- CreateTable
CREATE TABLE "user_table" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_table_email_key" ON "user_table"("email");
