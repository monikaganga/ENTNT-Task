import React from 'react';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { BarChart3, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export function Analytics() {
  const companies = useStore((state) => state.companies);
  const communications = useStore((state) => state.communications);
  const communicationMethods = useStore((state) => state.communicationMethods);

  const totalCommunications = communications.length;
  const completedCommunications = communications.filter((c) => c.completed).length;
  const methodStats = communicationMethods.map((method) => ({
    method: method.name,
    count: communications.filter((c) => c.methodId === method.id).length,
  }));

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-medium">Total Communications</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{totalCommunications}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-green-600" />
            <h3 className="text-sm font-medium">Active Companies</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{companies.length}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-medium">Completed</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{completedCommunications}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <h3 className="text-sm font-medium">Pending</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            {totalCommunications - completedCommunications}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Communication Methods</h3>
        <div className="space-y-4">
          {methodStats.map(({ method, count }) => (
            <div key={method} className="flex items-center">
              <div className="w-48 text-sm">{method}</div>
              <div className="flex-1">
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${(count / totalCommunications) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="w-12 text-right text-sm">{count}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}