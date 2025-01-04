import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStore } from '@/store/useStore';
import { format } from 'date-fns';

export function Calendar() {
  const communications = useStore((state) => state.communications);
  const companies = useStore((state) => state.companies);
  const communicationMethods = useStore((state) => state.communicationMethods);

  const events = communications.map((communication) => {
    const company = companies.find((c) => c.id === communication.companyId);
    const method = communicationMethods.find((m) => m.id === communication.methodId);

    return {
      id: communication.id,
      title: `${company?.name} - ${method?.name}`,
      date: format(communication.date, 'yyyy-MM-dd'),
      backgroundColor: communication.completed ? '#10B981' : '#F59E0B',
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        height="auto"
      />
    </div>
  );
}