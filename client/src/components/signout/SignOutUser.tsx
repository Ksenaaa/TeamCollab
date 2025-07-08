'use client'

import { useTransition } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/button/Button";
import { RouterPath } from "@/utils/constants/routerPath";

export const SignOutUser: React.FC = () => {
    const [isPending, startTransition] = useTransition();

    const handleSignOutUser = () => {
        startTransition(async () => {
            await signOut({ callbackUrl: RouterPath.HOME });
        });
    }

    return (
        <Button onClick={handleSignOutUser} title="Sign Out" isLoading={isPending} />
    )
}
