import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { toast } from "react-toastify";

import { UserSignInFormData, UserSignInSchema } from "./constants/userSignInSchema";
import { useRouter } from "next/navigation";
import { RouterPath } from "@/utils/constants/routerPath";

interface SignInModalProps {
    isOpenModal: boolean,
    onCloseModal: () => void,
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpenModal, onCloseModal }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { handleSubmit, control, reset } = useForm<UserSignInFormData>({
        defaultValues: { email: '', password: '' },
        resolver: zodResolver(UserSignInSchema),
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleSignInUser = handleSubmit((data: UserSignInFormData) => {
        startTransition(async () => {
            try {
                const result = await signIn("credentials", {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                    callbackUrl: RouterPath.HOME,
                });

                if (result?.error) throw new Error(result?.error);
                if (result?.ok) {
                    toast.success("Successfully signed in");
                    handleCloseModal();

                    router.push(RouterPath.HOME)
                }
            } catch (error: unknown) {
                toast.error((error instanceof Error) ? error.message : "An unexpected error occurred");
            }
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Sign In"
            onAgree={handleSignInUser}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="email" fieldLabel="Email" control={control} />
                <FormInput fieldName="password" fieldLabel="Password" control={control} type="password" />
            </div>
        </ModalApp>
    )
}
