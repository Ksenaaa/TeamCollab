"use client"

import { ButtonIcon } from "@/components/button/ButtonIcon"
import DeleteIcon from "@/assets/icons/delete-icon.svg"
import { useTransition } from "react";
import { useToggle } from "@/utils/hooks/useToggle";
import { ModalApp } from "@/components/modal/ModalApp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Board } from "@/generated/prisma";
import { deleteBoardAction } from "@/actions/boardActions";

interface DeleteBoardProps {
    board: Board
}

export const DeleteBoard: React.FC<DeleteBoardProps> = ({ board }) => {
    const { isOpen, onToggle } = useToggle()
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDeleteBoard = async () => {
        startTransition(async () => {
            const result = await deleteBoardAction(board.id)

            if (result.success) {
                toast.success(result.message);
                onToggle();

                router.push(`/${board.projectId}/boards`)
                return
            }

            toast.error(`Error deleting board: ${result.error || 'Unknown error'}`);
        })
    }

    return (
        <>
            <ButtonIcon className='span:w-6 span:h-6' icon={<DeleteIcon className='text-red' />} onClick={onToggle} isLoading={isPending} />
            {isOpen &&
                <ModalApp
                    isOpen={isOpen}
                    onClose={onToggle}
                    header="Delete Board"
                    onAgree={handleDeleteBoard}
                    isPending={isPending}
                >
                    <div className="w-100 max-w-full flex flex-col gap-4">
                        <p>Are you sure you want to delete this board with all its tasks?</p>
                    </div>
                </ModalApp>
            }
        </>
    )
}
