import { Suspense } from "react"
import { BoardComponent } from "@/components/boardTools/BoardComponent"
import { Loading } from "@/components/loading/Loading"
import prisma from "@/lib/prisma"

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
      <h1 className="heading-primary">Border:</h1>
      <p className="text-description">{board.name}</p>

      <Suspense fallback={<Loading />}>
        <BoardComponent board={board} />
      </Suspense>
    </div>
  )
}
