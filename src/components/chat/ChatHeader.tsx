'use client';

import { ConnectionStatus } from '@/types/chat';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { MessageSquare, UserCheck } from 'lucide-react';

interface ChatHeaderProps {
  connectionStatus: ConnectionStatus;
  onReconnect?: () => void;
}

export function ChatHeader({ connectionStatus, onReconnect }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
            <UserCheck className="w-5 h-5" />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            Консультант (Онлайн)
          </h2>
          <p className="text-xs text-slate-400">Персональная поддержка</p>
        </div>
      </div>

      <ConnectionStatusIndicator
        status={connectionStatus}
        onReconnect={onReconnect}
      />
    </div>
  );
}
