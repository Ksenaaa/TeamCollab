import { ButtonIcon } from "@/components/button/ButtonIcon"
import UpdateIcon from "@/assets/icons/edit-icon.svg"
import { useToggle } from "@/utils/hooks/useToggle";
import { UpdateBoardListModalForm } from "./UpdateBoardListModalForm";
import { List } from "@/generated/prisma";

interface UpdateBoardListProps {
    list: List
}

export const UpdateBoardList: React.FC<UpdateBoardListProps> = ({ list }) => {
    const { isOpen, onToggle } = useToggle()

    return (
        <>
            <ButtonIcon styles={{ width: '36px', height: '36px' }} icon={<UpdateIcon className='text-orange' />} onClick={onToggle} />
            {isOpen &&
                <UpdateBoardListModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    list={list}
                />
            }
        </>
    )
}
