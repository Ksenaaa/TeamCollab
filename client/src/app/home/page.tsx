import { ProjectCard } from "@/components/projectCard/ProjectCard";

export default async function HomePage() {
  // const projects = await prisma.projects.findMany()

  const projects = [
    { id: 1, name: 'Marketing Campaign Launch', description: 'Coordinate and launch new digital marketing campaigns.', status: 'In Progress' },
    { id: 2, name: 'Website Redesign Project', description: 'Revamp the company website with new UI/UX.', status: 'Completed' },
    { id: 3, name: 'Mobile App Development', description: 'Develop a new cross-platform mobile application.', status: 'Pending' },
    { id: 4, name: 'Internal Tool Automation', description: 'Automate repetitive internal processes.', status: 'In Progress' },
  ]

  return (

    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Welcome to Your Dashboard</h1>
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
