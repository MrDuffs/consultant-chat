import { ConnectionStatus } from '@/types/chat';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

interface ConnectionStatusIndicatorProps {
  status: ConnectionStatus;
  onReconnect?: () => void;
}

export function ConnectionStatusIndicator({ status, onReconnect }: ConnectionStatusIndicatorProps) {
  if (status === 'connected') {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <Wifi className="w-3.5 h-3.5" />
        <span>В сети</span>
      </div>
    );
  }

  if (status === 'connecting') {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span>Соединение...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
        <WifiOff className="w-3.5 h-3.5" />
        <span>Нет связи</span>
      </div>

      {onReconnect && (
        <button
          onClick={onReconnect}
          className="text-xs text-rose-400 underline hover:text-rose-300 transition-colors"
        >
          Переподключиться
        </button>
      )}
    </div>
  );
}
