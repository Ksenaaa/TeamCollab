import { Suspense } from "react"
import { notFound } from 'next/navigation';
import { BoardComponent } from "@/components/boardTools/BoardComponent"
import { Loading } from "@/components/loading/Loading"
import prisma from "@/lib/prisma"
import { StatusElement } from "@/components/statusElement/StatusElement"
import { DeleteBoard } from "@/components/boardTools/deleteBoard/DeleteBoard"
import { UpdateBoard } from "@/components/boardTools/updateBoard/UpdateBoard"

export default async function BoardPage({ params }: {
  params: Promise<{ boardId: string }>
}) {
  const { boardId } = await params
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: {
      lists: {
        orderBy: { order: 'asc' },
        include: {
          tasks: {
            orderBy: { order: 'asc' },
            include: {
              assigned: {
                select: { id: true, name: true, email: true }
              },
              comments: {
                orderBy: { createdAt: 'asc' },
                include: {
                  user: {
                    select: { id: true, name: true, email: true }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  if (!board) return notFound()

  return (
    <div className="w=full h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 items-center">
          <h1 className="heading-primary mr-2">{board.name}</h1>
          <UpdateBoard board={board} />
          <DeleteBoard board={board} />
        </div>
        <StatusElement status={board.status} />
      </div>

      <p className="text-lg mb-2">Border:</p>

      <Suspense fallback={<Loading />}>
        <BoardComponent board={board} />
      </Suspense>
    </div>
  )
}
