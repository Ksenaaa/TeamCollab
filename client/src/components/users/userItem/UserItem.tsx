'use client'

import { ModalApp } from "@/components/modal/ModalApp";
import { User } from "@/generated/prisma";
import { getAvatarBg } from "@/utils/helpers/getAvatarBg";
import { useToggle } from "@/utils/hooks/useToggle";
import { DeleteUser } from "../deleteUser/DeleteUser";
import { UpdateUser } from "../updateUser/UpdateUser";

interface MemberItemProps {
    user: User & {
        _count: {
            tasks: number
            comments: number
        }
    }
}

export const UserItem: React.FC<MemberItemProps> = ({ user }) => {
    const { isOpen, onToggle } = useToggle()
    const avatarColors = getAvatarBg(user.name);

    return (
        <>
            <div
                onClick={onToggle}
                className="w-70 relative bg-white p-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between border border-gray-200 cursor-pointer
                     transform hover:-translate-[2px] hover:scale-100"
            >
                <div className="flex items-center">
                    <div className={`w-12 h-12 ${avatarColors.bg} ${avatarColors.text} flex items-center justify-center rounded-full font-bold text-lg mr-4 border-1 border-gray-200`}>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                        <p className="text-gray-600 text-xs">{user.email}</p>
                    </div>
                </div>
            </div>

            <ModalApp isOpen={isOpen} onClose={onToggle} header="User Details" onAgree={onToggle}>
                <div className="w-100 max-w-full flex flex-col break-all">
                    <div className="flex flex-row items-center justify-start gap-2">
                        <p className="shrink-0 font-bold">Name:</p>
                        <p>{user.name}</p>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <p className="shrink-0 font-bold">Email:</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <p className="shrink-0 font-bold">Role:</p>
                        <p>{user.role}</p>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <p className="shrink-0 font-bold">Tasks:</p>
                        <p className="text-indigo font-bold">{user._count.tasks}</p>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <p className="shrink-0 font-bold">Comments:</p>
                        <p className="text-indigo font-bold">{user._count.comments}</p>
                    </div>
                </div>
                <div className="flex flex-row mt-3">
                    <UpdateUser user={user} />
                    <DeleteUser user={user} />
                </div>
            </ModalApp>
        </>
    );
};
