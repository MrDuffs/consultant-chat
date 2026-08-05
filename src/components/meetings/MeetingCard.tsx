import { Meeting } from '@/types/meeting';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';

interface MeetingCardProps {
  meeting: Meeting;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const isCompleted = meeting.status === 'completed';

  return (
    <div className="glass-card p-4 rounded-xl space-y-3 transition-all duration-200 hover:border-slate-700/80 hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-100 text-sm leading-snug">{meeting.title}</h3>
        <span
          className={`px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1 shrink-0 ${
            isCompleted
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3 h-3" /> Завершена
            </>
          ) : (
            <>
              <AlertCircle className="w-3 h-3" /> Запланирована
            </>
          )}
        </span>
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
