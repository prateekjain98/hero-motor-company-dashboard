'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ResourceUsageEntry } from '@/constants/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, SaveIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const resourceUsageSchema = z.object({
  plant_name: z.string().min(1, 'Plant name is required'),
  plant_location: z.string().min(1, 'Plant location is required'),
  entry_month: z.string().min(1, 'Entry month is required'),
  paint_consumption: z.number().min(0, 'Paint consumption must be positive'),
  energy_consumption: z.number().min(0, 'Energy consumption must be positive'),
  raw_material_usage: z.number().min(0, 'Raw material usage must be positive'),
  water_consumption: z.number().min(0, 'Water consumption must be positive'),
  gas_consumption: z.number().min(0, 'Gas consumption must be positive'),
  chemical_usage: z.number().min(0, 'Chemical usage must be positive'),
  waste_generated: z.number().min(0, 'Waste generated must be positive'),
  production_output: z.number().min(1, 'Production output must be at least 1'),
  efficiency_rating: z
    .number()
    .min(0)
    .max(100, 'Efficiency rating must be between 0-100'),
  cost_total: z.number().min(0, 'Total cost must be positive'),
  entered_by: z.string().min(1, 'Project manager name is required'),
  notes: z.string().optional()
});

type ResourceUsageFormData = z.infer<typeof resourceUsageSchema>;

const plants = [
  { name: 'Hero MotoCorp Plant 1', location: 'Gurgaon, Haryana' },
  { name: 'Hero MotoCorp Plant 2', location: 'Dharuhera, Haryana' },
  { name: 'Hero MotoCorp Plant 3', location: 'Haridwar, Uttarakhand' },
  { name: 'Hero MotoCorp Plant 4', location: 'Neemrana, Rajasthan' },
  { name: 'Hero MotoCorp Plant 5', location: 'Chittoor, Andhra Pradesh' },
  { name: 'Hero MotoCorp Plant 6', location: 'Halol, Gujarat' }
];

export function ResourceUsageForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResourceUsageFormData>({
    resolver: zodResolver(resourceUsageSchema),
    defaultValues: {
      plant_name: '',
      plant_location: '',
      entry_month: '',
      paint_consumption: 0,
      energy_consumption: 0,
      raw_material_usage: 0,
      water_consumption: 0,
      gas_consumption: 0,
      chemical_usage: 0,
      waste_generated: 0,
      production_output: 0,
      efficiency_rating: 0,
      cost_total: 0,
      entered_by: '',
      notes: ''
    }
  });

  const selectedPlant = form.watch('plant_name');

  // Auto-set location when plant is selected
  const handlePlantChange = (plantName: string) => {
    const plant = plants.find((p) => p.name === plantName);
    if (plant) {
      form.setValue('plant_location', plant.location);
    }
  };

  const onSubmit = async (data: ResourceUsageFormData) => {
    setIsLoading(true);

    try {
      // TODO: Implement API call to save the resource usage entry
      console.log('Saving resource usage entry:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to resources list
      router.push('/dashboard/resources');
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mx-auto max-w-4xl'>
      <Form
        onSubmit={form.handleSubmit(onSubmit)}
        form={form}
        className='space-y-6'
      >
        {/* Plant Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CalendarIcon className='h-5 w-5' />
              Plant & Period Information
            </CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='plant_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturing Plant</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handlePlantChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select plant' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {plants.map((plant) => (
                        <SelectItem key={plant.name} value={plant.name}>
                          {plant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='plant_location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Plant location' disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='entry_month'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Month</FormLabel>
                  <FormControl>
                    <Input {...field} type='month' placeholder='YYYY-MM' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='entered_by'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Manager</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Project manager name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Resource Consumption */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Consumption</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-3'>
            <FormField
              control={form.control}
              name='paint_consumption'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paint Consumption (Liters)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='energy_consumption'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energy Consumption (kWh)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='raw_material_usage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raw Material Usage (kg)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='water_consumption'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water Consumption (Liters)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gas_consumption'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gas Consumption (Cubic Meters)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='chemical_usage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chemical Usage (kg)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Production & Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle>Production & Performance</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <FormField
              control={form.control}
              name='production_output'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Production Output (Units)</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' placeholder='0' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='efficiency_rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Efficiency Rating (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.1'
                      min='0'
                      max='100'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='waste_generated'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waste Generated (kg)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cost_total'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Cost (₹)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      placeholder='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Any additional information about this monthly entry...'
                      className='min-h-20'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className='flex justify-end space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Saving...
              </>
            ) : (
              <>
                <SaveIcon className='mr-2 h-4 w-4' />
                Save Entry
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
