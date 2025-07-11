export const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 animate-pulse space-y-4">
            <LoadingIcon />
            <p className="text-gray-600 text-lg">Loading feed...</p>
        </div>
    );
};

export const LoadingIcon: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`w-6 h-6 border-4 border-indigo border-t-gray-200 border-b-gray-200 rounded-full animate-spin ${className}`} />
    );
};
