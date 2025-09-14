import { fakeProjects, Project } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProjectForm from './project-form';

type TProjectViewPageProps = {
  projectId: string;
};

export default async function ProjectViewPage({
  projectId
}: TProjectViewPageProps) {
  let project = null;
  let pageTitle = 'Create New Project';

  if (projectId !== 'new') {
    const data = await fakeProjects.getProjectById(Number(projectId));
    project = data.project as Project;
    if (!project) {
      notFound();
    }
    pageTitle = `Edit Project`;
  }

  return <ProjectForm initialData={project} pageTitle={pageTitle} />;
}
