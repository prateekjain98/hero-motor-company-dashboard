import { Project } from '@/constants/data';
import { fakeProjects } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { ProjectTable } from './project-tables';

type ProjectListingPage = {};

export default async function ProjectListingPage({}: ProjectListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeProjects.getProjects(filters);
  const totalProjects = data.total_projects;
  const projects: Project[] = data.projects;

  return <ProjectTable data={projects} totalItems={totalProjects} />;
}
