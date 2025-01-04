import React from 'react';
import { useStore } from '@/store/useStore';
import { CommunicationGrid } from './CommunicationGrid';
import { NotificationPanel } from './NotificationPanel';

export function UserDashboard() {
  const companies = useStore((state) => state.companies);
  const communications = useStore((state) => state.communications);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">User Dashboard</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CommunicationGrid
            companies={companies}
            communications={communications}
          />
        </div>
        <div>
          <NotificationPanel
            companies={companies}
            communications={communications}
          />
        </div>
      </div>
    </div>
  );
}