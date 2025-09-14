'use client';

import { FormFileUpload } from '@/components/forms/form-file-upload';
import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormTextarea } from '@/components/forms/form-textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Project, fakeProjects } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  name: z.string().min(2, {
    message: 'Project name must be at least 2 characters.'
  }),
  department: z.string().min(1, 'Please select a department.'),
  company_group: z.string().min(1, 'Please select a company group.'),
  price: z.number(),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});

export default function ProjectForm({
  initialData,
  pageTitle
}: {
  initialData: Project | null;
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    department: initialData?.department || '',
    company_group: initialData?.company_group || '',
    price: initialData?.price || undefined,
    description: initialData?.description || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (initialData) {
        // Update existing project (not implemented yet)
        console.log('Update project:', values);
        toast.success('Project updated successfully!');
      } else {
        // Create new project - always starts at L0
        const result = await fakeProjects.createProject({
          name: values.name,
          description: values.description,
          department: values.department as any,
          company_group: values.company_group as any,
          price: values.price
        });

        if (result.success) {
          toast.success(`Project created successfully! Starting at stage L0.`);
        } else {
          toast.error('Failed to create project');
          return;
        }
      }

      router.push('/dashboard/projects');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while saving the project');
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormFileUpload
            control={form.control}
            name='image'
            label='Project Image'
            description='Upload a project image'
            config={{
              maxSize: 5 * 1024 * 1024,
              maxFiles: 4
            }}
          />

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <FormInput
              control={form.control}
              name='name'
              label='Project Name'
              placeholder='Enter project name'
              required
            />

            <FormSelect
              control={form.control}
              name='department'
              label='Department'
              placeholder='Select department'
              required
              options={[
                { label: 'Supply Chain', value: 'supply-chain' },
                { label: 'Human Resources', value: 'hr' },
                { label: 'Finance', value: 'finance' },
                { label: 'R&D', value: 'rd' },
                { label: 'Manufacturing', value: 'manufacturing' },
                { label: 'Quality Assurance', value: 'quality-assurance' },
                { label: 'Sales & Marketing', value: 'sales-marketing' },
                { label: 'Information Technology', value: 'it' },
                { label: 'Procurement', value: 'procurement' },
                { label: 'Operations', value: 'operations' }
              ]}
            />

            <FormSelect
              control={form.control}
              name='company_group'
              label='Company Group'
              placeholder='Select company group'
              required
              options={[
                { label: 'Hero Cycles', value: 'hero-cycles' },
                { label: 'Hero Motors', value: 'hero-motors' },
                { label: 'HMC Hive', value: 'hmc-hive' },
                { label: 'Munjal', value: 'munjal' }
              ]}
            />

            <FormInput
              control={form.control}
              name='price'
              label='Price'
              placeholder='Enter price'
              required
              type='number'
              min={0}
              step='0.01'
            />
          </div>

          <FormTextarea
            control={form.control}
            name='description'
            label='Description'
            placeholder='Enter project description'
            required
            config={{
              maxLength: 500,
              showCharCount: true,
              rows: 4
            }}
          />

          <Button type='submit'>Add Project</Button>
        </Form>
      </CardContent>
    </Card>
  );
}
