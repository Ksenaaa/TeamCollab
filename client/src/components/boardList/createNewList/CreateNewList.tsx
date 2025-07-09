import { Button } from "@/components/button/Button";
import { useToggle } from "@/utils/hooks/useToggle";
import { Board } from "@/generated/prisma";
import { CreateNewListModalForm } from "./CreateNewListModalForm";

interface CreateNewListProps {
    board: Board
}

export const CreateNewList: React.FC<CreateNewListProps> = ({ board }) => {
    const { isOpen, onToggle } = useToggle();

    return (
        <>
            <Button onClick={onToggle} title="Add List" />
            {isOpen &&
                <CreateNewListModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    board={board}
                />
            }
        </>
    )
}
