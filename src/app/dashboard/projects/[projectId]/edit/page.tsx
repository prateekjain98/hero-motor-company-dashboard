import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { fakeProjects, Project } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProjectForm from '@/features/projects/components/project-form';

export const metadata = {
  title: 'Dashboard : Edit Project'
};

type PageProps = { params: Promise<{ projectId: string }> };

export default async function EditProjectPage(props: PageProps) {
  const params = await props.params;
  const data = await fakeProjects.getProjectById(Number(params.projectId));
  const project = data.project as Project;

  if (!project) {
    notFound();
  }

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ProjectForm initialData={project} pageTitle='Edit Project' />
        </Suspense>
      </div>
    </PageContainer>
  );
}
