import { delay } from '@/constants/mock-api';
import { DelayedProjects } from '@/features/overview/components/delayed-projects';

export default async function Sales() {
  await delay(3000);
  return <DelayedProjects />;
}
