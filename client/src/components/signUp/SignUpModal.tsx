'use client'

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { toast } from "react-toastify";
import GitHubIcon from "@/assets/icons/github-icon.svg";
import GoogleIcon from "@/assets/icons/google-icon.svg";
import { useRouter } from "next/navigation";
import { RouterPath } from "@/utils/constants/routerPath";
import { Button } from "@/components/button/Button";
import { AuthProviders } from "@/utils/constants/authProvider";
import { useToggle } from "@/utils/hooks/useToggle";
import Link from "next/link";
import { UserSignUpFormData, UserSignUpSchema } from "./constants/userSignUpSchema";
import { createUserAction } from "@/actions/userActions";
import { Role } from "@/generated/prisma";

const callbackUrl = `/${RouterPath.PROJECTS}`

export const SignUpModal = () => {
    const { isOpen: isOpenModal, onToggle: onCloseModal } = useToggle(true);
    const [currentAuthProvider, setCurrentAuthProvider] = useState<AuthProviders | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { handleSubmit, control, reset, setError } = useForm<UserSignUpFormData>({
        defaultValues: { email: '', password: '', confirmPassword: '', name: '' },
        resolver: zodResolver(UserSignUpSchema),
    });

    const handleCloseModal = () => {
        router.push('/');
        onCloseModal();
        reset();
    }

    const handleCloseModalAndRedirect = () => {
        router.push(callbackUrl)
        onCloseModal();
        reset();
    }

    const handleSignUpUser = handleSubmit((data: UserSignUpFormData) => {
        setCurrentAuthProvider(AuthProviders.CREDENTIALS);
        console.log(data)
        startTransition(async () => {
            try {
                const resultNewUser = await createUserAction({
                    email: data.email, name: data.name, password: data.password, role: Role.EDITOR_LIST
                })

                if (resultNewUser?.success) {
                    toast.success(resultNewUser.message);

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
                    return
                }

                if (resultNewUser?.details) {
                    Object.entries(resultNewUser.details).forEach(([field, messages]) => {
                        setError(field as keyof UserSignUpFormData, {
                            type: 'manual',
                            message: messages.join(', '),
                        });
                    });
                    toast.error(`Please correct the errors in the form`);
                    return
                }

                toast.error('Error creating user');
            } catch (error: unknown) {
                toast.error((error instanceof Error) ? error.message : "An unexpected error occurred");
            } finally {
                setCurrentAuthProvider(null);
            }
        });
    })

    const handleSocialSignUp = async (provider: AuthProviders) => {
        setCurrentAuthProvider(provider)

        startTransition(async () => {
            try {
                await signIn(provider, { callbackUrl });
                toast.success(`Successfully signed in with ${provider}`);
                onCloseModal();
            } catch (error) {
                console.error(`Error signing in with ${provider}: `, error);
                toast.error(`Failed to sign in with ${provider}`);
            } finally {
                setCurrentAuthProvider(null);
            }
        });
    };

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Create New Account"
            isPending={isPending}
        >
            <form className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="email" fieldLabel="Email" control={control} isAutoComplete={false} />
                <FormInput fieldName="name" fieldLabel="Name" control={control} isAutoComplete={false} />
                <FormInput fieldName="password" fieldLabel="Password" control={control} type="password" isAutoComplete={false} />
                <FormInput fieldName="confirmPassword" fieldLabel="Confirm password" type="password" control={control} isAutoComplete={false} />

                <Button
                    title="Create account"
                    onClick={handleSignUpUser}
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
                        title="Create with Google"
                        iconStart={<GoogleIcon className='w-4 h-4' />}
                        onClick={() => handleSocialSignUp(AuthProviders.GOOGLE)}
                        isLoading={isPending && currentAuthProvider === AuthProviders.GOOGLE}
                        disabled={isPending}
                    />
                    <Button
                        title="Create with GitHub"
                        iconStart={<GitHubIcon className='w-4 h-4' />}
                        onClick={() => handleSocialSignUp(AuthProviders.GITHUB)}
                        isLoading={isPending && currentAuthProvider === AuthProviders.GITHUB}
                        disabled={isPending}
                    />
                </div>

                <div className="relative text-sm text-gray-600">
                    Already have an account?? <span className="text-indigo">
                        <Link href="/auth/signin" className="text-indigo font-semibold hover:text-indigo-100 transition duration-300 ease-in-out">
                            Sign in
                        </Link>
                    </span>
                </div>
            </form>
        </ModalApp>
    )
}
