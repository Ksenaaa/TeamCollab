import { User } from "@/generated/prisma";

interface MemberItemProps {
    member: User
}

export const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    const handleClick = () => {
        // In a real app, you'd navigate to a detail page or open a modal
        console.log(`Member card clicked: ${member.name}`);
        // Using alert for demonstration purposes, replace with proper UI feedback
        // alert(`You clicked on member: ${member.name}`);
    };

    const getAvatarBg = (name: string) => {
        const colors = ['bg-blue-100', 'bg-green-100', 'bg-red-100', 'bg-yellow-100', 'bg-purple-100'];
        const textColors = ['text-blue-700', 'text-green-700', 'text-red-700', 'text-yellow-700', 'text-purple-700'];
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return {
            bg: colors[hash % colors.length],
            text: textColors[hash % textColors.length]
        };
    };

    const avatarColors = getAvatarBg(member.name);

    return (
        <div
            onClick={handleClick}
            className="relative bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between border border-gray-200 cursor-pointer
                 transform hover:-translate-y-1 hover:scale-102
                 bg-gradient-to-br from-green-50 to-blue-50"
        >
            <div className="flex items-center">
                <div className={`w-12 h-12 ${avatarColors.bg} ${avatarColors.text} flex items-center justify-center rounded-full font-bold text-lg mr-4`}>
                    {member.name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                    <p className="text-gray-500 text-xs">{member.email}</p>
                </div>
            </div>
            {/* The button below is now redundant as the whole card is clickable, but kept for visual consistency if needed */}
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View Profile
            </button>
        </div>
    );
};
