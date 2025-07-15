import { Suspense } from "react";
import { Loading } from "@/components/loading/Loading";
import prisma from "@/lib/prisma";
import { CreateNewProject } from "@/components/projectTools/createNewProject/CreateNewProject";
import { ProjectCard } from "@/components/projectTools/projectCard/ProjectCard";

export default async function Projects() {
  const projects = await prisma.project.findMany()

  return (
    <div>
      <h1 className="heading-primary mb-9">Welcome to Your Dashboard</h1>
      <p className="text-description mb-6">Here is an overview of your active projects</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-secondary">Your Projects</h2>
        <CreateNewProject />
      </div>

      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
