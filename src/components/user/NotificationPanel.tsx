import React from 'react';
import { Company, Communication } from '@/types';
import { format, isToday, isBefore } from 'date-fns';
import { useStore } from '@/store/useStore';
import { Bell } from 'lucide-react';

interface NotificationPanelProps {
  companies: Company[];
  communications: Communication[];
}

export function NotificationPanel({ companies, communications }: NotificationPanelProps) {
  const communicationMethods = useStore((state) => state.communicationMethods);

  const getNextCommunicationDate = (company: Company, lastCommunication?: Communication) => {
    if (!lastCommunication) {
      return new Date();
    }
    const nextDate = new Date(lastCommunication.date);
    nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);
    return nextDate;
  };

  const getCompanyStatus = (company: Company) => {
    const lastCommunication = communications
      .filter((c) => c.companyId === company.id)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

    const nextDate = getNextCommunicationDate(company, lastCommunication);
    
    if (isBefore(nextDate, new Date()) && !isToday(nextDate)) {
      return 'overdue';
    }
    if (isToday(nextDate)) {
      return 'today';
    }
    return 'upcoming';
  };

  const overdueCompanies = companies.filter((c) => getCompanyStatus(c) === 'overdue');
  const todayCompanies = companies.filter((c) => getCompanyStatus(c) === 'today');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Bell className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold">Notifications</h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-red-600 mb-2">Overdue</h4>
          {overdueCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-red-50 p-2 rounded-md text-sm mb-2"
            >
              <div className="font-medium">{company.name}</div>
              <div className="text-gray-600">Communication overdue</div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-medium text-yellow-600 mb-2">Due Today</h4>
          {todayCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-yellow-50 p-2 rounded-md text-sm mb-2"
            >
              <div className="font-medium">{company.name}</div>
              <div className="text-gray-600">Communication due today</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}