/*
  Warnings:

  - A unique constraint covering the columns `[boardId,order]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/

UPDATE "List" AS l
SET "order" = sub.rn
FROM (
    SELECT
        id,
        "boardId",
        ROW_NUMBER() OVER (PARTITION BY "boardId" ORDER BY "createdAt", id) - 1 AS rn 
    FROM "List"
) AS sub
WHERE l.id = sub.id AND l."boardId" = sub."boardId";

-- CreateIndex
CREATE UNIQUE INDEX "List_boardId_order_key" ON "List"("boardId", "order");
