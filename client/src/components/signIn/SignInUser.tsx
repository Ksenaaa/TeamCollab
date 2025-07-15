'use client'

import { Button } from "@/components/button/Button";
import { useRouter } from "next/navigation";

export const SignInUser: React.FC = () => {
    const router = useRouter();

    const handleSignInUser = () => {
        router.push('/auth/signin');
    }

    return (
        <Button onClick={handleSignInUser} title="Sign In" />
    )
}
