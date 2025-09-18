import { delay } from '@/constants/mock-api';
import { TopProjectsOverview } from '@/features/overview/components/top-projects-overview';

export default async function Sales() {
  await delay(3000);
  return <TopProjectsOverview />;
}
