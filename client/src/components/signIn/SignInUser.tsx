'use client'

import { Button } from "@/components/button/Button";
import { useToggle } from "@/utils/hooks/useToggle";
import { SignInModal } from "./SignInModal";

export const SignInUser: React.FC = () => {
    const { isOpen, onToggle } = useToggle();

    return (
        <>
            <Button onClick={onToggle} title="Sign In" />
            {isOpen &&
                <SignInModal
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                />
            }
        </>
    )
}
