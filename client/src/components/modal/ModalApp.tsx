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
    onAgree: () => void;
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
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-max"
            >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="text-center sm:mt-0 sm:text-left">
                        <DialogTitle className="text-base font-semibold text-indigo">
                            {header}
                        </DialogTitle>

                        <div className="mt-2">{children}</div>
                    </div>
                </div>
                <div className="bg-gray-100 px-4 py-3 flex flex-row sm:px-6 justify-end items-center">
                    <ButtonIcon
                        icon={<ConfirmIcon className={'text-green'} />}
                        onClick={onAgree}
                        isLoading={isPending}
                    />

                    <ButtonIcon
                        icon={<RejectIcon className={'text-red'} />}
                        onClick={onClose}
                    />
                </div>
            </DialogPanel>
        </ModalWrapper>
    );
};
