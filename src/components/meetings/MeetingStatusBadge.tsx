import { MeetingStatus } from '@/types/meeting';
import { Clock, PlayCircle, CheckCircle2, XCircle } from 'lucide-react';

interface MeetingStatusBadgeProps {
  status: MeetingStatus;
}

export function MeetingStatusBadge({ status }: MeetingStatusBadgeProps) {
  switch (status) {
    case 'scheduled':
      return (
        <span className="px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1 shrink-0 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Clock className="w-3 h-3" />
          <span>Запланирована</span>
        </span>
      );

    case 'in_progress':
      return (
        <span className="px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1 shrink-0 bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <PlayCircle className="w-3 h-3" />
          <span>В процессе</span>
        </span>
      );

    case 'completed':
      return (
        <span className="px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1 shrink-0 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" />
          <span>Завершена</span>
        </span>
      );

    case 'cancelled':
      return (
        <span className="px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1 shrink-0 bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle className="w-3 h-3" />
          <span>Отменена</span>
        </span>
      );

    default:
      return null;
  }
}
