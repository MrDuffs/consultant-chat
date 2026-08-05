export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

export type MessageStatus = 'sending' | 'sent' | 'failed';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'consultant' | 'system';
  timestamp: string;
  status: MessageStatus;
}
