export const getAvatarBg = (name: string) => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-red-100', 'bg-yellow-100', 'bg-purple-100'];
    const textColors = ['text-blue-700', 'text-green-700', 'text-red-700', 'text-yellow-700', 'text-purple-700'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
        bg: colors[hash % colors.length],
        text: textColors[hash % textColors.length]
    };
};
