'use client'

import { Button } from "@/components/button/Button";
import { useToggle } from "@/utils/hooks/useToggle";
import { CreateNewUserModalForm } from "./CreateNewUserModalForm";

export const CreateNewUser: React.FC = () => {
    const { isOpen, onToggle } = useToggle();

    return (
        <>
            <Button onClick={onToggle} title="Add User" />
            {isOpen &&
                <CreateNewUserModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                />
            }
        </>
    )
}
