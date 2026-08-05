import { create } from 'zustand';
import { ChatMessage, ConnectionStatus } from '@/types/chat';

interface ChatStore {
  messages: ChatMessage[];
  connectionStatus: ConnectionStatus;
  ws: WebSocket | null;

  // Actions
  setConnectionStatus: (status: ConnectionStatus) => void;
  addMessage: (message: ChatMessage) => void;
  updateMessageStatus: (id: string, status: ChatMessage['status']) => void;
  
  // WebSocket Lifecycle & Queue Management
  connect: (url?: string) => void;
  disconnect: () => void;
  sendMessage: (text: string) => void;
  retryMessage: (id: string) => void;
}

const WS_URL = 'ws://localhost:8081';

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [
    {
      id: 'init-1',
      text: 'Здравствуйте! Я ваш финансовый консультант. Чем могу помочь вам сегодня?',
      sender: 'consultant',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    },
  ],
  connectionStatus: 'disconnected',
  ws: null,

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateMessageStatus: (id, status) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, status } : msg
      ),
    })),

  connect: (url = WS_URL) => {
    const currentWs = get().ws;
    if (currentWs && (currentWs.readyState === WebSocket.CONNECTING || currentWs.readyState === WebSocket.OPEN)) {
      return;
    }

    set({ connectionStatus: 'connecting' });

    try {
      const socket = new WebSocket(url);

      socket.onopen = () => {
        set({ connectionStatus: 'connected', ws: socket });

        // При успешном переподключении — пытаемся повторить отправку неотправленных сообщений
        const pendingMessages = get().messages.filter(m => m.status === 'failed' || m.status === 'sending');
        pendingMessages.forEach((msg) => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(msg.text);
            get().updateMessageStatus(msg.id, 'sent');
          }
        });
      };

      socket.onmessage = (event) => {
        const text = event.data;
        
        // В нашем echo-сервере сообщение от консультанта — это эхо нашего сообщения
        // Для демонстрации: добавим ответное сообщение от консультанта
        const consultantReply: ChatMessage = {
          id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          text: `[Эхо]: ${text}`,
          sender: 'consultant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
        };

        get().addMessage(consultantReply);
      };

      socket.onerror = () => {
        set({ connectionStatus: 'disconnected' });
      };

      socket.onclose = () => {
        set({ connectionStatus: 'disconnected', ws: null });
        
        // Помечаем зависшие отправляющиеся сообщения как 'failed'
        set((state) => ({
          messages: state.messages.map((m) =>
            m.status === 'sending' ? { ...m, status: 'failed' } : m
          ),
        }));

        // Автоматическое переподключение через 3 секунды
        setTimeout(() => {
          if (get().connectionStatus === 'disconnected') {
            get().connect(url);
          }
        }, 3000);
      };
    } catch {
      set({ connectionStatus: 'disconnected', ws: null });
    }
  },

  disconnect: () => {
    const socket = get().ws;
    if (socket) {
      socket.close();
    }
    set({ ws: null, connectionStatus: 'disconnected' });
  },

  sendMessage: (text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
    };

    // 1. Оптимистичное добавление сообщения в ленту сразу
    get().addMessage(newMsg);

    const socket = get().ws;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(newMsg.text);
      // Помечаем отправленным (сервер пришлет echo через 300мс)
      get().updateMessageStatus(newMsg.id, 'sent');
    } else {
      // Если связи нет — помечаем сообщение статус 'failed' для последующего повтора
      get().updateMessageStatus(newMsg.id, 'failed');
    }
  },

  retryMessage: (id: string) => {
    const targetMsg = get().messages.find((m) => m.id === id);
    if (!targetMsg) return;

    get().updateMessageStatus(id, 'sending');

    const socket = get().ws;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(targetMsg.text);
      get().updateMessageStatus(id, 'sent');
    } else {
      // Пытаемся восстановить соединение и пометить ошибкой, если не вышло
      get().connect();
      setTimeout(() => {
        const currentSocket = get().ws;
        if (currentSocket && currentSocket.readyState === WebSocket.OPEN) {
          currentSocket.send(targetMsg.text);
          get().updateMessageStatus(id, 'sent');
        } else {
          get().updateMessageStatus(id, 'failed');
        }
      }, 500);
    }
  },
}));
