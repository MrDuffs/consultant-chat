import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { MeetingsList } from '@/components/meetings/MeetingsList';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { Meeting } from '@/types/meeting';

async function getMeetingsServer(): Promise<Meeting[]> {
  return [
    {
      id: 'm-1',
      title: 'Первичная консультация по финансам',
      date: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      status: 'scheduled',
      consultantName: 'Алексей Смирнов',
      durationMinutes: 45,
    },
    {
      id: 'm-2',
      title: 'Разбор инвестиционного портфеля',
      date: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
      status: 'scheduled',
      consultantName: 'Елена Васильева',
      durationMinutes: 60,
    },
    {
      id: 'm-3',
      title: 'Аудит текущих накопительных программ',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      status: 'completed',
      consultantName: 'Дмитрий Иванов',
      durationMinutes: 30,
    },
    {
      id: 'm-4',
      title: 'Стратегическая сессия по планированию бюджета',
      date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
      status: 'completed',
      consultantName: 'Мария Ковалева',
      durationMinutes: 60,
    },
  ];
}

export default async function ChatPage() {
  const queryClient = getQueryClient();

  // Префечим встречи в TanStack Query на сервере (SSR)
  await queryClient.prefetchQuery({
    queryKey: ['meetings'],
    queryFn: getMeetingsServer,
  });

  const initialMeetings = await getMeetingsServer();

  return (
    <main className="h-screen max-h-screen overflow-hidden bg-slate-950 p-4 md:p-6 flex flex-col">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col min-h-0 space-y-4 md:space-y-6">
        {/* Шапка страницы */}
        <header className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Чат с консультантом</h1>
            <p className="text-sm text-slate-400">Управление консультациями и поддержка в реальном времени</p>
          </div>
        </header>

        {/* Две основные части приложения на всю доступную высоту экрана */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 1. Список встреч пользователя (SSR + TanStack Query) */}
            <div className="lg:col-span-5 h-full min-h-0">
              <MeetingsList initialMeetings={initialMeetings} />
            </div>

            {/* 2. Чат поверх WebSocket */}
            <div className="lg:col-span-7 h-full min-h-0">
              <ChatContainer />
            </div>
          </div>
        </HydrationBoundary>
      </div>
    </main>
  );
}
