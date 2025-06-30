import { BoardCard } from "@/components/boardCard/BoardCard";
import prisma from "@/lib/prisma";

export default async function BoardsPage() {
  const boards = await prisma.board.findMany()

  // const handleAddBoard = () => {
  //   const newBoardName = prompt('Enter new board name:');
  //   if (newBoardName) {
  //     console.log([...boards, { id: Date.now(), name: newBoardName, description: 'New board description.' }]);
  //   }
  // };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Project Boards</h1>
      <p className="text-lg text-gray-600 mb-10">Organize your tasks and projects visually.</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Boards</h2>
        <button
          // onClick={handleAddBoard}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add New Board
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map(board => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};
