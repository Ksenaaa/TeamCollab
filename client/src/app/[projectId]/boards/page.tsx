import { Suspense } from "react";
import { BoardCard } from "@/components/boardCard/BoardCard";
import { Button } from "@/components/button/Button";
import { StatusElement } from "@/components/statusElement/StatusElement";
import prisma from "@/lib/prisma";
import { Loading } from "@/components/loading/Loading";

export default async function BoardsPage({ params }: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  const boards = await prisma.board.findMany({ where: { projectId } })
  const project = await prisma.project.findUnique({ where: { id: projectId } })

  if (!project) return

  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="heading-primary">{project.name}</h1>
        <StatusElement status={project.status} />
      </div>

      <p className="text-description">Organize your tasks and projects visually</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-secondary">All Boards</h2>
        <Button title="Add New Board" />
      </div>

      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};
