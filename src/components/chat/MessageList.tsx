'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: ChatMessage[];
  onRetryMessage?: (id: string) => void;
}

export function MessageList({ messages, onRetryMessage }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 space-y-3">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onRetry={onRetryMessage}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
