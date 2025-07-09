"use client"

import { ButtonIcon } from "@/components/button/ButtonIcon"
import UpdateIcon from "@/assets/icons/edit-icon.svg"
import { useToggle } from "@/utils/hooks/useToggle";
import { UpdateBoardModalForm } from "./UpdateBoardModalForm";
import { Board } from "@/generated/prisma";

interface UpdateBoardProps {
    board: Board
}

export const UpdateBoard: React.FC<UpdateBoardProps> = ({ board }) => {
    const { isOpen, onToggle } = useToggle()

    return (
        <>
            <ButtonIcon className='span:w-6 span:h-6' icon={<UpdateIcon className='text-orange' />} onClick={onToggle} />
            {isOpen &&
                <UpdateBoardModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    board={board}
                />
            }
        </>
    )
}
