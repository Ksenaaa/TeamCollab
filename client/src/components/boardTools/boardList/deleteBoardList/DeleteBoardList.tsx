import { useTransition } from "react";
import { ButtonIcon } from "@/components/button/ButtonIcon"
import { useToggle } from "@/utils/hooks/useToggle";
import { ModalApp } from "@/components/modal/ModalApp";
import { toast } from "react-toastify";
import { List } from "@/generated/prisma";
import RejectIcon from "@/assets/icons/cross-icon.svg";
import { deleteListAction } from "@/actions/listActions";

interface DeleteBoardListProps {
    list: List
}

export const DeleteBoardList: React.FC<DeleteBoardListProps> = ({ list }) => {
    const { isOpen, onToggle } = useToggle()
    const [isPending, startTransition] = useTransition();

    const handleDeleteList = async () => {
        startTransition(async () => {
            const result = await deleteListAction(list.id)

            if (result.success) {
                toast.success(result.message);
                onToggle();
                return
            }

            toast.error(`Error deleting list: ${result.error || 'Unknown error'}`);
        })
    }

    return (
        <>
            <ButtonIcon
                styles={{ width: '36px', height: '36px' }}
                icon={<RejectIcon className={'text-red'} />}
                onClick={onToggle}
                isLoading={isPending}
            />
            {isOpen &&
                <ModalApp
                    isOpen={isOpen}
                    onClose={onToggle}
                    header="Delete List"
                    onAgree={handleDeleteList}
                    isPending={isPending}
                >
                    <div className="w-100 max-w-full flex flex-col">
                        <p>Are you sure you want to delete &apos;<strong>{list.name}</strong>&apos; with all its tasks?</p>
                    </div>
                </ModalApp>
            }
        </>
    )
}
