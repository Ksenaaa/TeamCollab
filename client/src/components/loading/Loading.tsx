export const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 animate-pulse space-y-4">
            <div className="w-6 h-6 border-4 border-indigo border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-lg">Loading feed...</p>
        </div>
    );
};
