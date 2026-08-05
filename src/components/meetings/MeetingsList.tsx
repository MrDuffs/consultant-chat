'use client';

import { useQuery } from '@tanstack/react-query';
import { Meeting } from '@/types/meeting';
import { MeetingCard } from './MeetingCard';
import { RefreshCw, CalendarDays, Loader2 } from 'lucide-react';

async function fetchMeetings(): Promise<Meeting[]> {
  const res = await fetch('/api/meetings');
  if (!res.ok) {
    throw new Error('Не удалось загрузить список встреч');
  }
  return res.json();
}

interface MeetingsListProps {
  initialMeetings?: Meeting[];
}

export function MeetingsList({ initialMeetings }: MeetingsListProps) {
  const { data: meetings, refetch, isFetching, isError } = useQuery<Meeting[]>({
    queryKey: ['meetings'],
    queryFn: fetchMeetings,
    initialData: initialMeetings,
  });

  return (
    <section className="glass-panel p-5 rounded-2xl flex flex-col h-full space-y-4">
      {/* Header & Refetch Button */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-semibold text-slate-100">Мои встречи</h2>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          title="Обновить список встреч через TanStack Query"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          <span>{isFetching ? 'Обновление...' : 'Обновить'}</span>
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
        {isError && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs">
            Ошибка при обновлении списка встреч. Попробуйте еще раз.
          </div>
        )}

        {meetings && meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-slate-500 text-xs">
            <Loader2 className="w-6 h-6 animate-spin mb-2 text-indigo-400" />
            <span>Загрузка встреч...</span>
          </div>
        )}
      </div>
    </section>
  );
}
