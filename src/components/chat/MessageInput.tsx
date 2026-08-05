'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-end gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Напишите сообщение..."
        rows={1}
        className="flex-1 bg-slate-950/80 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none max-h-32 custom-scrollbar"
      />

      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:hover:bg-indigo-600 shrink-0 cursor-pointer"
        title="Отправить сообщение"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
