import { NextResponse } from 'next/server';
import { Meeting } from '@/types/meeting';

export const mockMeetings: Meeting[] = [
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
    date: new Date().toISOString(),
    status: 'in_progress',
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
  {
    id: 'm-5',
    title: 'Стратегическая сессия по планированию бюджета №5',
    date: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    status: 'scheduled',
    consultantName: 'Жорик Варяг',
    durationMinutes: 70,
  },
  {
    id: 'm-6',
    title: 'Маленькая стратегия',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: 'cancelled',
    consultantName: 'Павел Журавлёв',
    durationMinutes: 20,
  },
];

export async function GET() {
  return NextResponse.json(mockMeetings);
}
