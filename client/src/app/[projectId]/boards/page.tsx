import { Suspense } from "react";
import { StatusElement } from "@/components/statusElement/StatusElement";
import prisma from "@/lib/prisma";
import { Loading } from "@/components/loading/Loading";
import { BoardCard } from "@/components/boardTools/boardCard/BoardCard";
import { CreateNewBoard } from "@/components/boardTools/createNewBoard/CreateNewBoard";
import { DeleteProject } from "@/components/projectTools/deleteProject/DeleteProject";
import { UpdateProject } from "@/components/projectTools/updateProject/UpdateProject";

export default async function BoardsPage({ params }: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  const boardsData = prisma.board.findMany({ where: { projectId } })
  const projectData = prisma.project.findUnique({ where: { id: projectId } })

  const [boards, project] = await Promise.all([boardsData, projectData])

  if (!project) return

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 items-center">
          <h1 className="heading-primary mr-2">Project: {project.name}</h1>
          <UpdateProject project={project} />
          <DeleteProject projectId={projectId} />
        </div>
        <StatusElement status={project.status} />
      </div>

      <p className="text-description mb-4">{project.description}</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-secondary">All Boards:</h2>
        <CreateNewBoard projectId={projectId} />
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
