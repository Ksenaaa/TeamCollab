import { Dialog, DialogBackdrop } from "@headlessui/react";

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const ModalWrapper = ({
    isOpen,
    onClose,
    children,
}: ModalWrapperProps) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-3000">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-transp-gray"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center text-center items-center sm:p-0">
                    {children}
                </div>
            </div>
        </Dialog>
    );
};
