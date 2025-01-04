import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from '@/store/useStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  emails: z.array(z.string().email()).min(1, 'At least one email is required'),
  phoneNumbers: z.array(z.string()).min(1, 'At least one phone number is required'),
  comments: z.string(),
  communicationPeriodicity: z.number().min(1, 'Periodicity must be at least 1 day'),
});

type CompanyFormData = z.infer<typeof companySchema>;

export function CompanyForm() {
  const addCompany = useStore((state) => state.addCompany);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      emails: [''],
      phoneNumbers: [''],
      communicationPeriodicity: 14,
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    addCompany({
      id: crypto.randomUUID(),
      ...data,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Company Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register('location')} />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      <div>
        <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
        <Input id="linkedinProfile" {...register('linkedinProfile')} />
        {errors.linkedinProfile && <p className="text-red-500 text-sm">{errors.linkedinProfile.message}</p>}
      </div>

      <div>
        <Label htmlFor="emails">Email Addresses</Label>
        <Input id="emails" {...register('emails.0')} />
        {errors.emails && <p className="text-red-500 text-sm">{errors.emails.message}</p>}
      </div>

      <div>
        <Label htmlFor="phoneNumbers">Phone Numbers</Label>
        <Input id="phoneNumbers" {...register('phoneNumbers.0')} />
        {errors.phoneNumbers && <p className="text-red-500 text-sm">{errors.phoneNumbers.message}</p>}
      </div>

      <div>
        <Label htmlFor="comments">Comments</Label>
        <Input id="comments" {...register('comments')} />
      </div>

      <div>
        <Label htmlFor="communicationPeriodicity">Communication Periodicity (days)</Label>
        <Input
          id="communicationPeriodicity"
          type="number"
          {...register('communicationPeriodicity', { valueAsNumber: true })}
        />
        {errors.communicationPeriodicity && (
          <p className="text-red-500 text-sm">{errors.communicationPeriodicity.message}</p>
        )}
      </div>

      <Button type="submit">Add Company</Button>
    </form>
  );
}