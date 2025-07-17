import { ButtonIcon } from "@/components/button/ButtonIcon"
import UpdateIcon from "@/assets/icons/edit-icon.svg"
import { useToggle } from "@/utils/hooks/useToggle";
import { UpdateUserModalForm } from "./UpdateUserModalForm";
import { UsersShort } from "@/models/userShort";

interface UpdateUserProps {
    user: UsersShort
}

export const UpdateUser: React.FC<UpdateUserProps> = ({ user }) => {
    const { isOpen, onToggle } = useToggle()

    return (
        <>
            <ButtonIcon styles={{ width: '36px', height: '36px' }} icon={<UpdateIcon className='text-orange' />} onClick={onToggle} />
            {isOpen &&
                <UpdateUserModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    user={user}
                />
            }
        </>
    )
}
