import { ProjectCard } from "@/components/projectCard/ProjectCard";
import prisma from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany()

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-600 mb-10">Here is an overview of your active projects</p>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
