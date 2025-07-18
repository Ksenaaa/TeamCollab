'use client'

import { DialogPanel, DialogTitle } from "@headlessui/react";
import ConfirmIcon from "@/assets/icons/check-icon.svg";
import RejectIcon from "@/assets/icons/cross-icon.svg";
import { ModalWrapper } from "./ModalWrapper";
import { ButtonIcon } from "../button/ButtonIcon";

interface ModalAppProps {
    isOpen: boolean;
    header: string;
    children: React.ReactNode;
    isPending?: boolean;
    onAgree?: () => void;
    onClose: () => void;
}

export const ModalApp = ({
    isOpen,
    header,
    onAgree,
    onClose,
    children,
    isPending,
}: ModalAppProps) => {
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <DialogPanel
                transition
                className="flex flex-col relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-max"
            >
                <DialogTitle className="text-base font-semibold text-indigo text-center sm:text-left bg-white px-2 sm:px-4 md:px-6 py-4">
                    {header}
                </DialogTitle>
                <div className="bg-white px-2 sm:px-4 md:px-6 mb-3 sm:mb-4 flex flex-col overflow-scroll">
                    {children}
                </div>
                <div className="bg-gray-100 px-2 py-1 flex flex-row justify-end items-center">
                    {onAgree &&
                        <ButtonIcon
                            icon={<ConfirmIcon className={'text-green'} />}
                            onClick={onAgree}
                            isLoading={isPending}
                        />
                    }

                    <ButtonIcon
                        icon={<RejectIcon className={'text-red'} />}
                        onClick={onClose}
                    />
                </div>
            </DialogPanel>
        </ModalWrapper>
    );
};
