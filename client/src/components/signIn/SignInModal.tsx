'use client'

import { memo, useEffect, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { toast } from "react-toastify";
import GitHubIcon from "@/assets/icons/github-icon.svg";
import GoogleIcon from "@/assets/icons/google-icon.svg";
import { UserSignInFormData, UserSignInSchema } from "./constants/userSignInSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { RouterPath } from "@/utils/constants/routerPath";
import { Button } from "@/components/button/Button";
import { AuthProviders } from "@/utils/constants/authProvider";
import { useToggle } from "@/utils/hooks/useToggle";

interface SignInModalProps {
    isOpenModal?: boolean,
    onCloseModal?: () => void,
}

const callbackUrl = `/${RouterPath.PROJECTS}`

export const SignInModal: React.FC<SignInModalProps> = memo(({ }) => {
    const { isOpen: isOpenModal, onToggle: onCloseModal } = useToggle(true);
    const [currentAuthProvider, setCurrentAuthProvider] = useState<AuthProviders | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { handleSubmit, control, reset } = useForm<UserSignInFormData>({
        defaultValues: { email: '', password: '' },
        resolver: zodResolver(UserSignInSchema),
    });

    const handleCloseModal = () => {
        router.back();
        onCloseModal();
        reset();
    }

    const handleCloseModalAndRedirect = () => {
        router.push(callbackUrl)
        onCloseModal();
        reset();
    }

    const handleSignInUser = handleSubmit((data: UserSignInFormData) => {
        setCurrentAuthProvider(AuthProviders.CREDENTIALS);

        startTransition(async () => {
            try {
                const result = await signIn(AuthProviders.CREDENTIALS, {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                });

                if (result?.error) throw new Error(result?.error);
                if (result?.ok) {
                    toast.success("Successfully signed in");
                    handleCloseModalAndRedirect();
                }
            } catch (error: unknown) {
                toast.error((error instanceof Error) ? error.message : "An unexpected error occurred");
            } finally {
                setCurrentAuthProvider(null);
            }
        });
    })

    const handleSocialSignIn = async (provider: AuthProviders) => {
        setCurrentAuthProvider(provider)

        startTransition(async () => {
            try {
                await signIn(provider, { callbackUrl });
                toast.success(`Successfully signed in with ${provider}`);
                onCloseModal();
            } catch (error) {
                console.error(`Error signing in with ${provider}:`, error);
                toast.error(`Failed to sign in with ${provider}.`);
            } finally {
                setCurrentAuthProvider(null);
            }
        });
    };

    useEffect(() => {
        if (searchParams.has('callbackUrl')) {
            router.replace('/auth/signin', undefined);
        }
    }, [router, searchParams]);

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Sign In"
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="email" fieldLabel="Email" control={control} />
                <FormInput fieldName="password" fieldLabel="Password" control={control} type="password" />

                <Button
                    title="Sign In"
                    onClick={handleSignInUser}
                    isLoading={isPending && currentAuthProvider === AuthProviders.CREDENTIALS}
                    disabled={isPending}
                />

                <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative bg-white px-4 text-sm text-gray-600">
                        OR
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        title="Sign in with Google"
                        iconStart={<GoogleIcon className='w-4 h-4' />}
                        onClick={() => handleSocialSignIn(AuthProviders.GOOGLE)}
                        isLoading={isPending && currentAuthProvider === AuthProviders.GOOGLE}
                        disabled={isPending}
                    />
                    <Button
                        title="Sign in with GitHub"
                        iconStart={<GitHubIcon className='w-4 h-4' />}
                        onClick={() => handleSocialSignIn(AuthProviders.GITHUB)}
                        isLoading={isPending && currentAuthProvider === AuthProviders.GITHUB}
                        disabled={isPending}
                    />
                </div>
            </div>
        </ModalApp>
    )
})

SignInModal.displayName = 'SignInModal'
