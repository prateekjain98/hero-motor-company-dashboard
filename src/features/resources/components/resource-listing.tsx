import { ResourceUsageEntry } from '@/constants/data';
import { fakeResourceUsage } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { ResourceTable } from './resource-tables';
import { columns } from './resource-tables/columns';

type ResourceListingPage = {};

export default async function ResourceListingPage({}: ResourceListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const plants = searchParamsCache.get('plant');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(plants && { plants: plants })
  };

  const data = await fakeResourceUsage.getUsageEntries(filters);
  const totalEntries = data.total_entries;
  const entries: ResourceUsageEntry[] = data.entries;

  return (
    <ResourceTable data={entries} totalItems={totalEntries} columns={columns} />
  );
}
