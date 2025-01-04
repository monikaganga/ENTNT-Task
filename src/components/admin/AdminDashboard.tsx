import React from 'react';
import { useStore } from '@/store/useStore';
import { CompanyForm } from './CompanyForm';
import { CompanyList } from './CompanyList';

export function AdminDashboard() {
  const companies = useStore((state) => state.companies);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add New Company</h3>
          <CompanyForm />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Companies ({companies.length})</h3>
          <CompanyList companies={companies} />
        </div>
      </div>
    </div>
  );
}