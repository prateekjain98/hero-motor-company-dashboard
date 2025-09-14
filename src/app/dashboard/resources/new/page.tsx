import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ResourceUsageForm } from '@/features/resources/components/resource-usage-form';

export const metadata = {
  title: 'Add Resource Usage Entry'
};

export default function NewResourceUsagePage() {
  return (
    <PageContainer scrollable>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Add Monthly Resource Usage'
            description='Enter monthly consumption data for a manufacturing plant'
          />
        </div>

        <Separator />

        <ResourceUsageForm />
      </div>
    </PageContainer>
  );
}
