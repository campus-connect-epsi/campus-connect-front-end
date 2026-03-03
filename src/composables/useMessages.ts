import { apiCall } from './useApi';
import type { Message } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export async function getMessages(discussionId: number): Promise<Message[]> {
  const res = await apiCall<Message[]>(`${base()}/messages`);
  const all = res.payload ?? [];
  return all.filter((m) => m.discussionId === discussionId);
}

export async function sendMessage(data: Omit<Message, 'id' | 'timestamp'>): Promise<Message | null> {
  const res = await apiCall<Message>(`${base()}/messages`, {
    method: 'POST',
    body: data,
  });
  return res.payload;
}
