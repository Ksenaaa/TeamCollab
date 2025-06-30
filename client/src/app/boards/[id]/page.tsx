import prisma from "@/lib/prisma"

export default async function BoardPage({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const board = await prisma.board.findUnique({
    where: { id },
  })

  if (!board) return <div>No Data</div>

  return (
    <div>
      <h1>Border ID: {id}</h1>
      <p>{board.title}</p>
    </div>
  )
}

