'use client'

import { Button } from "@/components/button/Button";
import { useRouter } from "next/navigation";

export const SignUpUser: React.FC = () => {
    const router = useRouter();

    const handleSignUpUser = () => {
        router.push('/auth/signup');
    }

    return (
        <Button mode="outline" onClick={handleSignUpUser} title="Sign Up" />
    )
}
