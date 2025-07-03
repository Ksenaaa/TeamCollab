import Link from "next/link";
import { Project } from "@/generated/prisma";
import { StatusElement } from "../statusElement/StatusElement";

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Link
            href={`${project.id}/boards`}
            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer
                 transform hover:-translate-y-1 hover:scale-102
                 bg-gradient-to-br from-purple via-yellow-100 to-green-100"
        >
            <h3 className="text-xl font-semibold text-indigo mb-2">{project.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 truncate">{project.description}</p>
            <StatusElement status={project.status} />
        </Link>
    );
};
