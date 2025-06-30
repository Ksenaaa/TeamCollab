import { Board } from "@/generated/prisma";
import Link from "next/link";

interface BoardCardProps {
    board: Board
}

export const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
    return (
        <Link
            href={`/boards/${board.id}`}
            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer
                 transform hover:-translate-y-1 hover:scale-102
                 bg-gradient-to-br from-purple-50 to-pink-50"
        >
            <h3 className="text-xl font-semibold text-purple-800 mb-2">{board.title}</h3>
            <div className="flex justify-end">
                {/* The button below is now redundant as the whole card is clickable, but kept for visual consistency if needed */}
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Open Board
                </button>
            </div>
        </Link>
    );
};
