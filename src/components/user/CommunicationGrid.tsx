import React from 'react';
import { Company, Communication } from '@/types';
import { format } from 'date-fns';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { CommunicationDialog } from './CommunicationDialog';

interface CommunicationGridProps {
  companies: Company[];
  communications: Communication[];
}

export function CommunicationGrid({ companies, communications }: CommunicationGridProps) {
  const communicationMethods = useStore((state) => state.communicationMethods);
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  };

  const getMethodName = (methodId: string) => {
    return communicationMethods.find((method) => method.id === methodId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Communications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => {
              const lastCommunications = getLastFiveCommunications(company.id);
              return (
                <tr key={company.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{company.name}</div>
                    <div className="text-sm text-gray-500">{company.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {lastCommunications.map((comm) => (
                        <div key={comm.id} className="text-sm">
                          {getMethodName(comm.methodId)} -{' '}
                          {format(comm.date, 'MMM d, yyyy')}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      onClick={() => setSelectedCompany(company)}
                      variant="outline"
                      size="sm"
                    >
                      Log Communication
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <CommunicationDialog
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}