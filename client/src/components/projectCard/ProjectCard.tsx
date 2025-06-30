import Link from "next/link";

interface ProjectCardProps {
    project: {
        id: number;
        name: string;
        description: string;
        status: string;
    };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Link
            href={`${project.id}/boards`}
            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer
                 transform hover:-translate-y-1 hover:scale-102
                 bg-gradient-to-br from-indigo-50 to-purple-50"
        >
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">{project.name}</h3>
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{project.description}</p>
            <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                </span>
                {/* The button below is now redundant as the whole card is clickable, but kept for visual consistency if needed */}
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Details
                </button>
            </div>
        </Link>
    );
};
