import { User } from "@/generated/prisma";
import { getAvatarBg } from "@/utils/helpers/getAvatarBg";

interface MemberItemProps {
    user: User
}

export const UserItem: React.FC<MemberItemProps> = ({ user }) => {
    const avatarColors = getAvatarBg(user.name);

    return (
        <div
            // onClick={handleClick}
            className="relative bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between border border-gray-200 cursor-pointer
                 transform hover:-translate-y-1 hover:scale-102
                 bg-gradient-to-br from-green to-blue"
        >
            <div className="flex items-center">
                <div className={`w-12 h-12 ${avatarColors.bg} ${avatarColors.text} flex items-center justify-center rounded-full font-bold text-lg mr-4`}>
                    {user.name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.role}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
            </div>
        </div>
    );
};
