import { ChatMessage } from '@/types/chat';
import { Check, CheckCheck, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

interface MessageItemProps {
  message: ChatMessage;
  onRetry?: (id: string) => void;
}

export function MessageItem({ message, onRetry }: MessageItemProps) {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs bg-slate-800/60 text-slate-400 px-3 py-1 rounded-full border border-slate-700/50">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-slate-800 text-slate-100 border border-slate-700/60 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        
        <div className={`flex items-center justify-end gap-1.5 mt-1 text-[10px] ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
          <span>{message.timestamp}</span>

          {isUser && (
            <span>
              {message.status === 'sending' && (
                <span title="Отправка...">
                  <Loader2 className="w-3 h-3 animate-spin text-indigo-200" />
                </span>
              )}
              {message.status === 'sent' && (
                <span title="Отправлено">
                  <CheckCheck className="w-3.5 h-3.5 text-indigo-200" />
                </span>
              )}
              {message.status === 'failed' && (
                <span title="Не доставлено">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-300" />
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Ошибка доставки и кнопка повтора */}
      {isUser && message.status === 'failed' && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 pr-1">
          <span>Не отправлено</span>
          {onRetry && (
            <button
              onClick={() => onRetry(message.id)}
              className="flex items-center gap-1 font-medium text-rose-300 hover:text-rose-200 underline active:scale-95 transition-all"
            >
              <RefreshCw className="w-3 h-3" />
              Повторить
            </button>
          )}
        </div>
      )}
    </div>
  );
}
