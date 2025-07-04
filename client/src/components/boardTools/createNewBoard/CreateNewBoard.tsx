'use client'

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button/Button";
import { ModalApp } from "@/components/modal/ModalApp";
import { useToggle } from "@/utils/hooks/useToggle";
import { BoardFormData, BoardSchema } from "./constants/boardSchema";
import { InputText } from "@/components/inputText/InputText";
import { createBoardAction } from "@/actions/boardActions";

interface CreateNewBoardProps {
    projectId: string;
}

export const CreateNewBoard: React.FC<CreateNewBoardProps> = ({ projectId }) => {
    const { isOpen, onToggle } = useToggle();
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<BoardFormData>({
        resolver: zodResolver(BoardSchema),
    });

    const handleCloseModal = () => {
        onToggle();
        reset();
    }

    const handleCreateBoard = handleSubmit((data: BoardFormData) => {
        startTransition(async () => {
            await createBoardAction({ ...data, project: { connect: { id: projectId } } });
            reset(data);
            handleCloseModal();
        });
    })

    return (
        <>
            <Button onClick={onToggle} title="Add New Board" />
            <ModalApp
                isOpen={isOpen}
                onClose={handleCloseModal}
                header="Create New Board"
                onAgree={handleCreateBoard}
                isPending={isPending}
            >
                <div className="w-100 max-w-full flex flex-col gap-4">
                    <InputText name="name" label="Name" errorText={errors.name?.message} register={register('name')} />
                </div>
            </ModalApp>
        </>
    )
}
