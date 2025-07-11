/*
  Warnings:

  - A unique constraint covering the columns `[listId,order]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
UPDATE "Task" AS l
SET "order" = sub.rn
FROM (
    SELECT
        id,
        "listId",
        ROW_NUMBER() OVER (PARTITION BY "listId" ORDER BY "createdAt", id) - 1 AS rn 
    FROM "Task"
) AS sub
WHERE l.id = sub.id AND l."listId" = sub."listId";

-- CreateIndex
CREATE UNIQUE INDEX "Task_listId_order_key" ON "Task"("listId", "order");
