import { Suspense } from "react"
import { BoardComponent } from "@/components/boardTools/BoardComponent"
import { Loading } from "@/components/loading/Loading"
import prisma from "@/lib/prisma"
import { StatusElement } from "@/components/statusElement/StatusElement"

export default async function BoardPage({ params }: {
  params: Promise<{ boardId: string }>
}) {
  const { boardId } = await params
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: {
      lists: {
        include: {
          tasks: true
        }
      }
    }
  })

  if (!board) return <div>No Data</div>

  return (
    <div className="w=full h-full">
      <div className="flex justify-between items-start">
        <h1 className="heading-primary">{board.name}</h1>
        <StatusElement status={board.status} />
      </div>

      <p className="text-lg mb-2">Border:</p>

      <Suspense fallback={<Loading />}>
        <BoardComponent board={board} />
      </Suspense>
    </div>
  )
}
