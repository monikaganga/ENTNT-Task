import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Company } from '@/types';
import { useStore } from '@/store/useStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

interface CommunicationDialogProps {
  company: Company | null;
  onClose: () => void;
}

const communicationSchema = z.object({
  methodId: z.string().min(1, 'Communication method is required'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string(),
});

type CommunicationFormData = z.infer<typeof communicationSchema>;

export function CommunicationDialog({ company, onClose }: CommunicationDialogProps) {
  const communicationMethods = useStore((state) => state.communicationMethods);
  const addCommunication = useStore((state) => state.addCommunication);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommunicationFormData>({
    resolver: zodResolver(communicationSchema),
  });

  const onSubmit = (data: CommunicationFormData) => {
    if (!company) return;

    addCommunication({
      id: crypto.randomUUID(),
      companyId: company.id,
      methodId: data.methodId,
      date: new Date(data.date),
      notes: data.notes,
      completed: true,
    });

    reset();
    onClose();
  };

  if (!company) return null;

  return (
    <Dialog open={!!company} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Communication - {company.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="methodId">Communication Method</Label>
            <Select {...register('methodId')}>
              {communicationMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </Select>
            {errors.methodId && (
              <p className="text-red-500 text-sm">{errors.methodId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" {...register('date')} />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" {...register('notes')} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}