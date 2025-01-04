import React from 'react';
import { Company } from '@/types';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { Trash2 } from 'lucide-react';

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({ companies }: CompanyListProps) {
  const deleteCompany = useStore((state) => state.deleteCompany);

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <div
          key={company.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{company.name}</h4>
              <p className="text-sm text-gray-600">{company.location}</p>
              <a
                href={company.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteCompany(company.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}