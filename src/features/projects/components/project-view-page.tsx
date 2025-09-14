import { fakeProjects, Project } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProjectForm from './project-form';
import ProjectDetails from './project-details';

type TProjectViewPageProps = {
  projectId: string;
};

export default async function ProjectViewPage({
  projectId
}: TProjectViewPageProps) {
  let project = null;
  let pageTitle = 'Create New Project';

  if (projectId === 'new') {
    return <ProjectForm initialData={null} pageTitle={pageTitle} />;
  }

  // For viewing project details
  const data = await fakeProjects.getProjectById(Number(projectId));
  project = data.project as Project;
  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
