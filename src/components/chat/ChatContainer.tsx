'use client';

import { useEffect } from 'react';
import { useChatStore } from '@/stores/useChatStore';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export function ChatContainer() {
  const {
    messages,
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    retryMessage,
  } = useChatStore();

  useEffect(() => {
    // Подключаемся к WebSocket при монтировании компонента чата
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <section className="glass-panel rounded-2xl flex flex-col h-full overflow-hidden">
      <ChatHeader
        connectionStatus={connectionStatus}
        onReconnect={() => connect()}
      />

      <MessageList
        messages={messages}
        onRetryMessage={retryMessage}
      />

      <MessageInput
        onSendMessage={sendMessage}
      />
    </section>
  );
}
