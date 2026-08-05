import { Meeting } from '@/types/meeting';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, User } from 'lucide-react';
import { MeetingStatusBadge } from './MeetingStatusBadge';

interface MeetingCardProps {
  meeting: Meeting;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="glass-card p-4 rounded-xl space-y-3 transition-all duration-200 hover:bg-slate-800/80 hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-100 text-sm leading-snug">{meeting.title}</h3>
        <MeetingStatusBadge status={meeting.status} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{formatDate(meeting.date)}</span>
        </div>

        {meeting.consultantName && (
          <div className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span className="truncate">{meeting.consultantName}</span>
          </div>
        )}

        {meeting.durationMinutes && (
          <div className="flex items-center gap-1.5 col-span-2">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Длительность: {meeting.durationMinutes} мин</span>
          </div>
        )}
      </div>
    </div>
  );
}
