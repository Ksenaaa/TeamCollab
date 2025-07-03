import { Suspense } from "react";
import { Button } from "@/components/button/Button";
import { ProjectCard } from "@/components/projectCard/ProjectCard";
import prisma from "@/lib/prisma";
import { Loading } from "@/components/loading/Loading";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany()

  return (
    <div>
      <h1 className="heading-primary">Welcome to Your Dashboard</h1>
      <p className="text-description">Here is an overview of your active projects</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-secondary">Your Projects</h2>
        <Button title="Add New Project" />
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
