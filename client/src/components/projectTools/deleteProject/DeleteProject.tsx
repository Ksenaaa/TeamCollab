"use client"

import { ButtonIcon } from "@/components/button/ButtonIcon"
import DeleteIcon from "@/assets/icons/delete-icon.svg"
import { useTransition } from "react";
import { useToggle } from "@/utils/hooks/useToggle";
import { ModalApp } from "@/components/modal/ModalApp";
import { deleteProjectAction } from "@/actions/projectActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RouterPath } from "@/utils/constants/routerPath";

interface DeleteProjectProps {
    projectId: string
}

export const DeleteProject: React.FC<DeleteProjectProps> = ({ projectId }) => {
    const { isOpen, onToggle } = useToggle()
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDeleteProject = async () => {
        startTransition(async () => {
            const result = await deleteProjectAction(projectId)

            if (result.success) {
                toast.success(result.message);
                onToggle();

                router.push(`/${RouterPath.PROJECTS}`)
                return
            }

            toast.error(`Error deleting project: ${result.error || 'Unknown error'}`);
        })
    }

    return (
        <>
            <ButtonIcon icon={<DeleteIcon className='text-red' />} onClick={onToggle} isLoading={isPending} />
            {isOpen &&
                <ModalApp
                    isOpen={isOpen}
                    onClose={onToggle}
                    header="Delete Project"
                    onAgree={handleDeleteProject}
                    isPending={isPending}
                >
                    <div className="w-100 max-w-full flex flex-col gap-4">
                        <p>Are you sure you want to delete this project with all its boards and tasks?</p>
                    </div>
                </ModalApp>
            }
        </>
    )
}
