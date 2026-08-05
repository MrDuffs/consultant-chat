export type MeetingStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Meeting {
  id: string;
  title: string;
  date: string;
  status: MeetingStatus;
  consultantName?: string;
  durationMinutes?: number;
}
