import { BoardComponent } from "@/components/boardTools/BoardComponent"
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
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Border:</h1>
      <p className="text-lg text-gray-600 mb-10">{board.name}</p>
      <BoardComponent board={board} />
    </div>
  )
}
