import Link from "next/link";
import { Board } from "@/generated/prisma";
import { StatusElement } from "@/components/statusElement/StatusElement";

interface BoardCardProps {
    board: Board
}

export const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
    return (
        <Link
            href={`boards/${board.id}`}
            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer
                 transform hover:-translate-y-1 hover:scale-102
                 bg-gradient-to-bl from-yellow-100 to-purple"
        >
            <p className="text-xl font-semibold text-indigo mb-2">{board.name}</p>
            <StatusElement status={board.status} />
        </Link>
    );
};
