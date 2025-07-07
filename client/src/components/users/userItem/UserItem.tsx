'use client'

import { ModalApp } from "@/components/modal/ModalApp";
import { User } from "@/generated/prisma";
import { getAvatarBg } from "@/utils/helpers/getAvatarBg";
import { useToggle } from "@/utils/hooks/useToggle";

interface MemberItemProps {
    user: User
}

export const UserItem: React.FC<MemberItemProps> = ({ user }) => {
    const { isOpen, onToggle } = useToggle()
    const avatarColors = getAvatarBg(user.name);

    return (
        <>
            <div
                onClick={onToggle}
                className="w-100 relative bg-white p-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between border border-gray-200 cursor-pointer
                     transform hover:-translate-[2px] hover:scale-100"
            >
                <div className="flex items-center">
                    <div className={`w-12 h-12 ${avatarColors.bg} ${avatarColors.text} flex items-center justify-center rounded-full font-bold text-lg mr-4 border-1 border-gray-200`}>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                        <p className="text-gray-600 text-sm">{user.role}</p>
                    </div>
                </div>
            </div>

            <ModalApp isOpen={isOpen} onClose={onToggle} header="User Details" onAgree={onToggle}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </ModalApp>
        </>
    );
};
